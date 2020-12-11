// import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
// const { IntercomNativeModule } = NativeModules;
//
// export class IntercomService {
//
//     checkNativeModule() {
//       if (!IntercomNativeModule) {
//         console.error('IntercomNativeModule is undefined!');
//         return false;
//       } else {
//         return true;
//       }
//     }
//
//     registerUserWithEmail(email) {
//       if (!this.checkNativeModule()) {
//         return Promise.reject('NativeModule error');
//       };
//       return new Promise((resolve, reject) => {
//             IntercomNativeModule.registerUserWithEmail(email, (error) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve();
//               }
//             });
//           });
//     }
//
//     updateUser(options) {
//       if (!this.checkNativeModule()) {
//         return Promise.reject('NativeModule error');
//       };
//       return  new Promise((resolve, reject) => {
//             IntercomNativeModule.updateUser(options, (error) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve();
//               }
//             });
//           });
//     }
//
//     logout() {
//       if (!this.checkNativeModule()) {
//         return Promise.reject('NativeModule error');
//       };
//       return new Promise((resolve, reject) => {
//             IntercomNativeModule.logout((error) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve();
//               }
//             });
//           });
//     }
//
//     displayMessenger() {
//       if (!this.checkNativeModule()) {
//         return Promise.reject('NativeModule error');
//       };
//       return new Promise((resolve, reject) => {
//             IntercomNativeModule.displayMessenger((error) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve();
//               }
//             });
//           });
//     }
//
//     hideMessenger() {
//       if (!this.checkNativeModule()) {
//         return Promise.reject('NativeModule error');
//       };
//       return new Promise((resolve, reject) => {
//             IntercomNativeModule.hideMessenger((error) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 resolve();
//               }
//             });
//           });
//     }
// }
//
// module.exports = (() => {
//     return new IntercomService();
// })();
