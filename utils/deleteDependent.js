/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter9247 = { 'updatedBy': { '$in': user } };
      const Blog8569 = await deleteBlog(BlogFilter9247);
      const BlogFilter2121 = { 'addedBy': { '$in': user } };
      const Blog6262 = await deleteBlog(BlogFilter2121);
      const userFilter1887 = { 'addedBy': { '$in': user } };
      const user3741 = await deleteUser(userFilter1887);
      const userFilter6525 = { 'updatedBy': { '$in': user } };
      const user6703 = await deleteUser(userFilter6525);
      const userTokensFilter4934 = { 'userId': { '$in': user } };
      const userTokens6946 = await deleteUserTokens(userTokensFilter4934);
      const userTokensFilter7845 = { 'addedBy': { '$in': user } };
      const userTokens8443 = await deleteUserTokens(userTokensFilter7845);
      const userTokensFilter5187 = { 'updatedBy': { '$in': user } };
      const userTokens3997 = await deleteUserTokens(userTokensFilter5187);
      const roleFilter7879 = { 'addedBy': { '$in': user } };
      const role8899 = await deleteRole(roleFilter7879);
      const roleFilter5023 = { 'updatedBy': { '$in': user } };
      const role3226 = await deleteRole(roleFilter5023);
      const projectRouteFilter8695 = { 'addedBy': { '$in': user } };
      const projectRoute6655 = await deleteProjectRoute(projectRouteFilter8695);
      const projectRouteFilter2967 = { 'updatedBy': { '$in': user } };
      const projectRoute7877 = await deleteProjectRoute(projectRouteFilter2967);
      const routeRoleFilter7493 = { 'addedBy': { '$in': user } };
      const routeRole4636 = await deleteRouteRole(routeRoleFilter7493);
      const routeRoleFilter4350 = { 'updatedBy': { '$in': user } };
      const routeRole0679 = await deleteRouteRole(routeRoleFilter4350);
      const userRoleFilter0596 = { 'userId': { '$in': user } };
      const userRole9995 = await deleteUserRole(userRoleFilter0596);
      const userRoleFilter3871 = { 'addedBy': { '$in': user } };
      const userRole1076 = await deleteUserRole(userRoleFilter3871);
      const userRoleFilter3486 = { 'updatedBy': { '$in': user } };
      const userRole4922 = await deleteUserRole(userRoleFilter3486);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9930 = { 'roleId': { '$in': role } };
      const routeRole0399 = await deleteRouteRole(routeRoleFilter9930);
      const userRoleFilter1215 = { 'roleId': { '$in': role } };
      const userRole3160 = await deleteUserRole(userRoleFilter1215);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter3309 = { 'routeId': { '$in': projectroute } };
      const routeRole2012 = await deleteRouteRole(routeRoleFilter3309);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter3516 = { 'updatedBy': { '$in': user } };
      const Blog0464 = await softDeleteBlog(BlogFilter3516, updateBody);
      const BlogFilter6655 = { 'addedBy': { '$in': user } };
      const Blog4127 = await softDeleteBlog(BlogFilter6655, updateBody);
      const userFilter1943 = { 'addedBy': { '$in': user } };
      const user7317 = await softDeleteUser(userFilter1943, updateBody);
      const userFilter6902 = { 'updatedBy': { '$in': user } };
      const user7347 = await softDeleteUser(userFilter6902, updateBody);
      const userTokensFilter6100 = { 'userId': { '$in': user } };
      const userTokens8916 = await softDeleteUserTokens(userTokensFilter6100, updateBody);
      const userTokensFilter4658 = { 'addedBy': { '$in': user } };
      const userTokens2121 = await softDeleteUserTokens(userTokensFilter4658, updateBody);
      const userTokensFilter5375 = { 'updatedBy': { '$in': user } };
      const userTokens6290 = await softDeleteUserTokens(userTokensFilter5375, updateBody);
      const roleFilter9428 = { 'addedBy': { '$in': user } };
      const role2336 = await softDeleteRole(roleFilter9428, updateBody);
      const roleFilter6986 = { 'updatedBy': { '$in': user } };
      const role7837 = await softDeleteRole(roleFilter6986, updateBody);
      const projectRouteFilter2825 = { 'addedBy': { '$in': user } };
      const projectRoute2719 = await softDeleteProjectRoute(projectRouteFilter2825, updateBody);
      const projectRouteFilter3996 = { 'updatedBy': { '$in': user } };
      const projectRoute2979 = await softDeleteProjectRoute(projectRouteFilter3996, updateBody);
      const routeRoleFilter4728 = { 'addedBy': { '$in': user } };
      const routeRole7593 = await softDeleteRouteRole(routeRoleFilter4728, updateBody);
      const routeRoleFilter4398 = { 'updatedBy': { '$in': user } };
      const routeRole0944 = await softDeleteRouteRole(routeRoleFilter4398, updateBody);
      const userRoleFilter2959 = { 'userId': { '$in': user } };
      const userRole3781 = await softDeleteUserRole(userRoleFilter2959, updateBody);
      const userRoleFilter8060 = { 'addedBy': { '$in': user } };
      const userRole9776 = await softDeleteUserRole(userRoleFilter8060, updateBody);
      const userRoleFilter5126 = { 'updatedBy': { '$in': user } };
      const userRole5094 = await softDeleteUserRole(userRoleFilter5126, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter9286 = { 'roleId': { '$in': role } };
      const routeRole8702 = await softDeleteRouteRole(routeRoleFilter9286, updateBody);
      const userRoleFilter7862 = { 'roleId': { '$in': role } };
      const userRole2820 = await softDeleteUserRole(userRoleFilter7862, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter4283 = { 'routeId': { '$in': projectroute } };
      const routeRole7624 = await softDeleteRouteRole(routeRoleFilter4283, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
