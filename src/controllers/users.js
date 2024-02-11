require("dotenv").config();
const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const query = require("../lib/queries/users");
const catalogQuery = require("../lib/queries/catalogs");
const orderQuery = require("../lib/queries/orders");
const orderMapQuery = require("../lib/queries/orderMappping");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var passwordValidator = require("password-validator");
const db = require("../models");

// Password Validator
const passswordValidate = (password) => {
  const schema = new passwordValidator();
  schema
    .is().min(6)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces();

  return schema.validate(password);
};

// User Registration through username, mobileNo and password
exports.userRegistration = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const body = req.body;

    const isValidPassword = passswordValidate(body?.password);

    if (!isValidPassword) {
      errors.errors.push({
        msg: `A minimum of one uppercase and lowercase character, as well as no spaces, are required in the password.`,
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let alreadyExists = await query.getUserByMobileNo(body.mobileNo);

    if (alreadyExists) {
      errors.errors.push({
        msg: `User already exists with mobileNo ${body.mobileNo}`,
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let newUser = {
      name: body?.userName,
      password: body.password,
      mobileNo: body?.mobileNo,
      role: body?.role,
    };

    query.createUser(newUser);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Registration Succesfull",
      null,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// user login through username, mobileNo and password
exports.userLogin = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const body = req.body;

    let user = await query.getUserByMobileNo(body?.mobileNo);

    if (!user) {
      errors.errors.push({
        msg: `User not found with mobileNo ${body?.mobileNo}`,
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const passwordMatch = await bcrypt.compareSync(
      body.password,
      user.password
    );

    if (!passwordMatch) {
      errors.errors.push({
        msg: "Please check mobile number or password",
      });
      return response.sendResponse(
        constant.response_code.UNAUTHORIZED,
        null,
        null,
        res,
        errors
      );
    }

    const userDataForToken = {
      name: user?.name,
      mobileNo: user?.mobileNo,
      role: user?.role,
      id: user?.id,
    };

    token = await genNewToken(userDataForToken, res);

    let userInfo = {
      id: user?.id,
      name: user?.name,
      mobileNo: user?.mobileNo,
      role: user?.role,
      token,
    };

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Login Successful",
      userInfo,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Function to generate JWT token
const genNewToken = async (payload, res) => {
  try {
    var token = jwt.sign(payload, process.env.jwtsecret, {
      expiresIn: constant.jwt.EXPIRE_SELLER,
    });
    return token;
  } catch (err) {
    console.log(`Error in generating token: ${err}`);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error in generating token",
      null,
      res
    );
  }
};

// Function to fetch all active Seller list
exports.sellerList = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let userList = await query.getUsersList("Seller");

    if (!userList) {
      errors.errors.push({
        msg: `Currently, there are no sellers available. Please try again later`,
      });
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        null,
        null,
        res,
        errors
      );
    }

    return response.sendResponse(
      constant.response_code.SUCCESS,
      constant.STRING_CONSTANTS.SUCCESS,
      userList,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Function to create new catalog by sellers
exports.createNewCatalog = async (req, res) => {
  try {
    let userId = req?.user?.id;

    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let body = req.body;

    body = {
      ...body,
      sellerId: userId,
    };

    catalogQuery.createCatalog(body);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Item added succesfully",
      null,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Function to fetch all available products against specific seller
exports.getListOfItems = async (req, res) => {
  try {
    let userId = req?.params?.id;

    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let user = await query.getUserByIdForBuyer(userId);

    if (!user) {
      errors.errors.push({
        msg: `Seller not found with userId: ${userId}`,
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let listOfItems = await catalogQuery.getCatalogsList(userId);

    if (!listOfItems.length) {
      errors.errors.push({
        msg: `As of now no items has been posted by seller`,
      });
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        null,
        null,
        res,
        errors
      );
    }

    return response.sendResponse(
      constant.response_code.SUCCESS,
      constant.STRING_CONSTANTS.SUCCESS,
      listOfItems,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Function to create order 
exports.createOrder = async (req, res) => {
  try {
    let userId = req?.user?.id;

    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let body = req.body;
    let orderList = body?.orderList;
    let user = await query.getUserById(userId);

    if (!user) {
      errors.errors.push({
        msg: `User not found with userId: ${userId}`,
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    if (!orderList || Object.keys(orderList).length === 0) {
      errors.errors.push({
        msg: `Please select items and valid quantities`,
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const itemIds = Object.keys(orderList);

    const availableIds = await catalogQuery.checkCatalogItemIds(itemIds);

    let totalPrice = 0;
    for (const itemId of itemIds) {
      const quantity = orderList[itemId];
      const item = availableIds.find((item) => item.id === +itemId);
      if (item) {
        const price = item?.price;
        totalPrice += price * quantity;
      } else {
        errors.errors.push({
          msg: `Item with ID ${itemId} not found in the catalog.`,
          itemId: itemId,
        });
      }
    }

    if (errors.errors.length > 0) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const createOrder = await orderQuery.createOrder({
      buyerId: userId,
      totalCartValue: totalPrice,
      address: body?.address,
      pincode: body?.pincode,
      city: body?.city,
      status: "Scheduled",
    });

    response.sendResponse(
      constant.response_code.SUCCESS,
      constant.STRING_CONSTANTS.SUCCESS,
      null,
      res,
      null
    );
    const orderId = createOrder?.id;
    const orderMappings = Object.keys(orderList).map((itemId) => {
      return {
        orderId,
        itemId,
        quantity: orderList[itemId],
      };
    });

    orderMapQuery.createOrderMappingBulk(orderMappings);
    return;
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Function to fetch all orders associated with seller
exports.fetchOrdersForBuyers = async (req, res) => {
  try {
    let userId = req?.user?.id;

    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let user = await query.getUserById(userId);

    if (!user) {
      errors.errors.push({
        msg: `User not found with userId: ${userId}`,
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let orderData = await db.sequelize.query(
      `call getOrderDetailsAgainstBuyer(:userId)`,
      {
        replacements: {
         userId
        },
      }
    );

    orderData=orderData?.length ? orderData[0]?.data : null;

    if(!orderData){
     return response.sendResponse(
        constant.response_code.SUCCESS,
        "Currently no order available",
        null,
        res,
        null
      );
    }

   return response.sendResponse(
      constant.response_code.SUCCESS,
      constant.STRING_CONSTANTS.SUCCESS,
      orderData,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};