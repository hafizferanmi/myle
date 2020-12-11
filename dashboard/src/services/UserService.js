// import {
//     AsyncStorage,
//     PermissionsAndroid
// } from 'react-native';
// const tokenKey = 'token_id';
// const userKey = 'user';
// const permissionsKey = 'user_permissions';
// const settingsKey = 'settings';
// const selected_companyKey = 'selected_company';
//
// export class UserService {
//
//     getAuthInfo(cbSuccess, cbError) {
//         AsyncStorage.multiGet([tokenKey, userKey], (err, val) => {
//             if(err) {
//                 return cbError(err);
//             }
//
//             if(!val) {
//                 return cbError();
//             }
//
//             let authInfo = {
//                 header : {
//                     Authorization : 'Bearer ' + val[0][1]
//                 },
//                 user : JSON.parse(val[1][1])
//             };
//
//             return cbSuccess(authInfo);
//         });
//     }
//
//
//
//     saveCredentials(token, user, selected_company, permissions, callback) {
//         AsyncStorage.multiSet([
//             [tokenKey, token],
//             [userKey, JSON.stringify(user)],
//             [permissionsKey, JSON.stringify(permissions)],
//             [selected_companyKey, JSON.stringify(selected_company)]
//         ], (err) => {
//             if(err) {
//                 throw err;
//             }
//             return callback({success:true});
//         })
//     }
//
//     getCredentials() {
//         return new Promise((resolve, reject) => {
//             AsyncStorage.multiGet([
//                 tokenKey, userKey, permissionsKey, selected_companyKey
//             ], (err, values) => {
//                 if(err) {
//                     reject(err);
//                 }
//                 if (values && values.length == 4) {
//                     const values_check = values.reduce((all, item) => {
//                         if (Array.isArray(all)) {
//                             return (!!all[1] && !!item[1])
//                         } else {
//                             return (all && !!item[1])
//                         }
//                     })
//                     if (!values_check) {
//                         resolve(null);
//                     }
//                     const allItems = {
//                         token: values[0][1],
//                         user: JSON.parse(values[1][1]),
//                         permissions: JSON.parse(values[2][1]),
//                         selected_company: JSON.parse(values[3][1]),
//                     }
//                     resolve(allItems);
//                 } else {
//                     resolve(null);
//                 }
//             });
//         });
//     }
//
//     clearCredentials() {
//         return new Promise((resolve, reject) => {
//             AsyncStorage.multiRemove([
//                 tokenKey, userKey, permissionsKey, selected_companyKey
//             ], (err) => {
//                 if(err) {
//                     reject(err);
//                 }
//                 resolve();
//             });
//         });
//     }
//
//     saveUser(user, callback) {
//         AsyncStorage.multiSet([
//             [settingsKey, JSON.stringify(user)]
//         ], (err) => {
//             if(err) {
//                 throw err;
//             }
//             return callback({success:true});
//         })
//     }
//
//     getSettings(cbSuccess, cbError) {
//         AsyncStorage.getItem(settingsKey, (err, val) => {
//             if(err) {
//                 return cbError(err);
//             }
//             if(!val) {
//                 return cbError();
//             }
//             return cbSuccess(JSON.parse(val));
//         });
//     }
//
//     saveSettings(settings, callback) {
//         AsyncStorage.multiSet([
//             [userKey, JSON.stringify(settings)]
//         ], (err) => {
//             if(err) {
//                 throw err;
//             }
//             return callback({success:true});
//         })
//     }
//
//
//     checkLocationPermission() {
//         return new Promise((resolve, reject) => {
//             return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((status) => {
//                 // NOT ALLOWED
//                 if (status == false) {
//                     return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((status) => {
//                         if (status == 'denied') {
//                             return reject();
//                         }
//                         return resolve();
//                     }, () => {
//                         return reject();
//                     });
//                 }
//                 return resolve()
//             });
//         });
//     }
//
//
// }
//
//
// module.exports = new UserService();