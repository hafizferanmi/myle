// import { NativeModules } from "react-native";
//
// //TODO:
// // - use only one default background color for the all same backgrounds
// export const themes = {
//     dark: {
//         key          : 'dark',
//         id: 0,
//
//         STATUS_BAR_COLOR : '#1e1d25',
//         //TOPBAR
//         TOPBAR_BACKGROUND_COLOR: '#ffffff',
//         TOPBAR_TEXT_COLOR: '#000000',
//         TOPBAR_ICON_COLOR: '#000000',
//         //
//         HEADER_COLOR : '#2b2a35',
//         TABS_COLOR   : '#1D1C1F',
//         ICON_COLOR   : '#9596a2',
//         SELECTED_ICON_COLOR   : '#FFFFFF',
//         TEXT_COLOR   : '#9596a2',
//         SELECTED_TEXT_COLOR   : '#FFFFFF',
//         LAYOUT_BACKGROUND_COLOR   : '#121212',
//
//         loading: require('../animations/lottie/loading_light.json'),
//
//         car_available              : 'dark_car_available.png',
//         car_available_selected     : 'dark_car_available_selected.png',
//
//         common: {
//             info_page_background: '#FFFFFF',
//             bottom_separator_color: '#EAE5EF',
//             title_text_color: '#7C3FB1',
//         },
//         map_bottom_sheet: {
//             background: '#121212',
//             button_title_color: '#4F4758',
//         },
//         not_found: {
//             background        : '#121212',
//             button_background : '#7A3DAE',
//             button_color      : '#FFFFFF',
//             label             : '#8F9198'
//         },
//         /*progressbar: {
//             progress_tint_color         : '#7A3DAE',
//             track_tint_color   : '#8E8E93'
//         },*/
//         action_buttons: {
//             background          : '#34333D',
//             underlay_background : '#565465',
//             color      : '#adadb1'
//         },
//         no_cars: {
//             top_background : '#28272D',
//             bottom_background : '#1D1C1F',
//             label      : '#8F9198',
//             value      : '#FFFFFF'
//         },
//         suggest_login: {
//             background          : '#28272D',
//             accent_background   : '#3853F2',
//             accent_color        : '#FFFFFF',
//             cancel_color        : '#8F9198',
//             value               : '#FFFFFF'
//         },
//         /*reserve_car: {
//           gradient                   : ['#7A3DAE','#596CDD'],
//           period_inactive_background : '#2d2c33',
//           period_active_background   : '#1f1e22',
//           period_border_color        : '#3D3D3D',
//           active_color               : '#FFFFFF',
//           inactive_color             : '#8E8E93',
//           button_background          : '#2b2a35',
//           button_color               : '#FFFFFF',
//           payment_background         : '#1D1C1F',
//           payment_label              : '#FFFFFF',
//           payment_label_description  : '#8F9198',
//           payment_value              : '#8E8E93',
//           partner_background         : '#2B2A34',
//           partner_input              : '#FFFFFF',
//           name_color                 : '#FFFFFF',
//           license_color              : '#8F9198'
//         },*/
//         car_item: {
//             top_background_color: '#28272D',
//             bottom_background_color: '#1D1C1F',
//             title_color: '#FFFFFF',
//             plate_color: '#8E8E93',
//             value_color: '#8E8E93'
//         },
//         filter: {
//             label             : '#77777D',
//             value             : '#77777D',
//             border            : '#3D3D3D',
//             button_background : '#2b2a35',
//             button_color      : '#FFFFFF'
//         },
//         /*transaction: {
//             background: '#28272D',
//             color     : '#8E8E93',
//             border    : '#413f49',
//             section_label : '#8F9198',
//             section_value : '#FFFFFF'
//         },*/
//         /*expense: {
//             top_background_color    : '#28272D',
//             bottom_background_color : '#1D1C1F',
//             color                   : '#8E8E93',
//             background : '#28272D',
//             label      : '#8E8E93',
//             value      : '#FFFFFF',
//             border     : '#3D3D3D',
//             button_background : '#1D1C1F',
//             button_color      : '#FFFFFF',
//         },*/
//         /*credit: {
//             background : '#28272D',
//             label      : '#8E8E93',
//             value      : '#FFFFFF',
//             border     : '#3D3D3D',
//             button_background : '#1D1C1F',
//             button_color      : '#FFFFFF',
//         },*/
//         /*receipt: {
//             top_background_color    : '#28272D',
//             bottom_background_color : '#1D1C1F',
//             background : '#28272D',
//             button_background : '#1D1C1F',
//             label      : '#8E8E93',
//             value      : '#a4a4aa',
//             border     : '#3D3D3D',
//         },*/
//         /*tollway: {
//             top_background_color    : '#28272D',
//             bottom_background_color : '#1D1C1F',
//             border                  : '#3D3D3D',
//             plate_color             : '#8E8E93',
//             value_color             : '#a4a4aa',
//         },*/
//         settings: {
//             background : '#1D1C1F',
//             color      : '#FFFFFF',
//             border     : '#3D3D3D',
//             label      : '#8E8E93',
//             icon       : '#8F9198',
//             button_background: '#1D1C1F',
//             button_color     : '#FFFFFF'
//         },
//         /*account_settings: {
//             background   : '#1D1C1F',
//             header_color :'#FFFFFF',
//             border       : '#3D3D3D',
//             value        : '#8E8E93',
//             input      : '#1D1C1F',
//             input_label_color: '#8E8E93',
//             input_color: '#FFFFFF',
//             line_color : '#3D3D3D',
//             button_background: '#1D1C1F',
//             button_color     : '#FFFFFF'
//         },*/
//         /*chat: {
//             bkg_color: '#242328',
//             bkg2_color: '#1D1C1F',
//             separate_line_color: '#3D3D3D',
//             text_line1_color: '#FFFFFF',
//             text_line2_color: '#8E8E93',
//             unread_container_color: '#7A3DAE',
//             unread_container_text_color: '#FFFFFF',
//             avatar_bkg_color: '#3E3D45',
//             avatar_sign_color: '#FFFFFF',
//             msg_bkg_color: '#28272D',
//             msg_my_bkg_color: '#1D1C1F',
//             msg_border_color: '#434245',
//
//             text_tech_color: '#8E8E93',
//             msg_tech_bkg_color: '#28272D',
//
//             wallpaper_img: require('../../assets/img/chat/chat_wallpaper_dark.jpg'),
//             topBarLeftButtonColor: '#DADAE2',
//             topBarRightButtonColor: '#838388',
//             header_text_color_row1: '#FFFFFF',
//             header_text_color_row2: '#8E8E93',
//         },*/
//         /*coupons: {
//             background      : '#25242c',
//             input           : '#1D1C1F',
//             input_color     : '#8F9198',
//             copy_color      : '#FFFFFF',
//             copy_background : '#3D3D3D',
//             code_color      : '#FFFFFF'
//         },*/
//         reservation: {
//             background : '#28272D',
//             label      : '#8E8E93',
//             value      : '#FFFFFF',
//             border     : '#3D3D3D',
//             button_background : '#1D1C1F',
//             button_color      : '#FFFFFF',
//             item_background: '#28272D',
//             last_item_background: '#1D1C1F',
//             not_found_background : '#32313B',
//             not_found_value      : '#FFFFFF'
//         },
//         reservation_item:{
//             text_light: '#766587',
//             text: '#2c2436',
//         },
//         /*finish_reservation: {
//             background          : '#28272D',
//             accent_background   : '#3853F2',
//             accent_color        : '#FFFFFF',
//             cancel_color        : '#8F9198',
//             label               : '#8F9198',
//             value               : '#FFFFFF',
//             icon_color          : '#8F9198'
//         },*/
//         balance: {
//             background           : '#28272D',
//             label                : '#8E8E93',
//             value                : '#FFFFFF',
//             border               : '#3D3D3D',
//             payout_background    : '#3853F2',
//             payout_color         : '#FFFFFF',
//             add_funds_background : '#32313B',
//             add_funds_color      : '#FFFFFF',
//             cancel_background    : '#32313B',
//             cancel_color         : '#FFFFFF',
//             tabs_indicator       : '#3853F2'
//         },
//         /*payout: {
//             background: '#28272D',
//             label: '#8E8E93',
//             value: '#FFFFFF',
//             border: '#3D3D3D',
//             input: '#1D1C1F',
//             cancel_background    : '#32313B',
//             cancel_color         : '#FFFFFF',
//             confirm_amount_color      : '#DFDFE6',
//             confirm_amount_background: '#28272D',
//             confirm_background: '#1D1C1F',
//             confirm_color             : '#DFDFE6'
//         },*/
//         /*add_funds: {
//             background: '#28272D',
//             input: '#1D1C1F',
//             label: '#8E8E93',
//             value: '#FFFFFF'
//         },*/
//         /*radar: {
//             background: '#28272D',
//             label: '#8F9198',
//             value: '#FFFFFF',
//             border: '#3D3D3D',
//             close_button_background : '#32313B',
//             close_button_color      : '#FFFFFF',
//             confirm_button_background : '#3853F2',
//             confirm_button_color      : '#FFFFFF'
//         },*/
//         /*active_reservation: {
//             background : '#28272D',
//             accent_background: '#1D1C1F',
//             label      : '#8E8E93',
//             value      : '#FFFFFF',
//             border     : '#3D3D3D',
//             slide_background  : '#3853F2',
//             slide_color       : '#FFFFFF',
//             button_background  : '#28272D',
//             button_color       : '#8E8E93',
//         },*/
//         /*report: {
//             value: '#FFFFFF',
//             label: '#8E8E93',
//             cancel_background: '#32313B',
//             cancel_color: '#FFFFFF',
//             confirm_background : '#3853F2',
//             confirm_color      : '#FFFFFF',
//             active_type_background   : '#2A2A2E',
//             active_type_color        : '#FFFFFF',
//             inactive_type_background : '#1A1818',
//             inactive_type_color      : '#8F9198',
//             input                    : '#FFFFFF',
//             input_color              : '#6A6A6A'
//         },*/
//         /*payments: {
//             background: '#28272D',
//             bottom_background: '#1D1C1F',
//             label: '#FFFFFF',
//             value: '#8E8E93',
//             button_background : '#1D1C1F',
//             button_color      : '#FFFFFF'
//         }*/
//     },
//     light: {
//         key              : 'light',
//         id               : 1,
//         STATUS_BAR_COLOR : '#7A3DAE',
//         HEADER_COLOR     : '#443A51',
//         TABS_COLOR       : '#7A3DAE',
//         //TOPBAR
//         TOPBAR_BACKGROUND_COLOR: '#ffffff',
//         TOPBAR_TEXT_COLOR: '#000000',
//         TOPBAR_ICON_COLOR: '#000000',
//         //
//         ICON_COLOR       : '#B8BEE0',
//         SELECTED_ICON_COLOR   : '#FFFFFF',
//         TEXT_COLOR   : '#B8BEE0',
//         SELECTED_TEXT_COLOR   : '#FFFFFF',
//
//         LAYOUT_BACKGROUND_COLOR   : '#7A3DAE',
//         loading: require('../animations/lottie/loading_dark.json'),
//         car_available              : 'dark_car_available.png',
//         car_available_selected     : 'dark_car_available_selected.png',
//
//         common: {
//             info_page_background: '#FFFFFF',
//             bottom_separator_color: '#EAE5EF',
//             title_text_color: '#7C3FB1',
//         },
//         map_bottom_sheet: {
//             background: '#FFFFFF',
//             button_title_color: '#4F4758',
//         },
//         not_found: {
//             background        : '#FFFFFF',
//             button_background : '#7A3DAE',
//             button_color      : '#FFFFFF',
//             label             : '#B9B9BF'
//         },
//         /*progressbar: {
//             progress_tint_color     : '#7A3DAE',
//             track_tint_color        : '#8E8E93'
//         },*/
//         action_buttons: {
//             background          : '#F6F6F6',
//             underlay_background : '#FBFBFB',
//             color               : '#242328'
//         },
//         no_cars: {
//             top_background : '#7A3DAE',
//             bottom_background : '#ECF0F6',
//             label      : '#B9B9BF',
//             value      : '#FFFFFF'
//         },
//         suggest_login: {
//             background          : '#FFFFFF',
//             accent_background   : '#7A3DAE',
//             accent_color        : '#FFFFFF',
//             cancel_color        : '#FFFFFF',
//             value               : '#28272D',
//         },
//         /*reserve_car: {
//             gradient                   : ['#7A3DAE','#596CDD'],
//             period_inactive_background : '#e7ecf3',
//             period_active_background   : '#ffffff',
//             period_border_color        : '#ECF0F6',
//             active_color               : '#28272D',
//             inactive_color             : '#77777D',
//             button_background          : '#7A3DAE',
//             button_color               : '#FFFFFF',
//             payment_background         : '#e7ecf3',
//             payment_label              : '#8F9198',
//             payment_label_description  : '#717278',
//             payment_value              : '#46444e',
//             partner_background         : '#7A3DAE',
//             partner_input              : '#FFFFFF',
//             name_color                 : '#FFFFFF',
//             license_color              : '#e7ecf3'
//         },*/
//         car_item: {
//             top_background_color: '#fefeff',
//             bottom_background_color: '#f2f7fc',
//             title_color: '#38393B',
//             plate_color: '#77777D',
//             value_color: '#77777D',
//         },
//         filter: {
//             label             : '#77777D',
//             value             : '#28272D',
//             border            : '#ECF0F6',
//             button_background : '#7A3DAE',
//             button_color      : '#FFFFFF'
//         },
//         /*transaction: {
//             background    : '#FEFEFF',
//             color         : '#77777D',
//             border        : '#ECF0F6',
//             section_label : '#28272D',
//             section_value : '#28272D'
//         },*/
//         /*expense: {
//             top_background_color: '#FEFEFF',
//             bottom_background_color: '#FEFEFF',
//             color     : '#8F9198',
//             background : '#FEFEFF',
//             label      : '#8F9198',
//             value      : '#28272D',
//             border     : '#ECF0F6',
//             button_background : '#EBEFF3',
//             button_color      : '#77777D'
//         },*/
//         /*credit: {
//             background : '#FEFEFF',
//             label      : '#8F9198',
//             value      : '#28272D',
//             border     : '#ECF0F6',
//             button_background : '#EBEFF3',
//             button_color      : '#77777D'
//         },*/
//         /*receipt: {
//             top_background_color: '#FEFEFF',
//             bottom_background_color: '#FEFEFF',
//             background : '#FEFEFF',
//             button_background : '#EBEFF3',
//             label      : '#8F9198',
//             value      : '#363447',
//             border     : '#ECF0F6',
//         },*/
//         /*tollway: {
//             top_background_color    : '#FFFFFF',
//             bottom_background_color : '#FFFFFF',
//             border                  : '#ECF0F6',
//             plate_color             : '#8F9198',
//             value_color             : '#77777D',
//         },*/
//         settings: {
//             background : '#FFFFFF',
//             color      : '#28272D',
//             border     : '#ECF0F6',
//             label      : '#77777D',
//             icon       : '#8F9198',
//             button_background: '#7A3DAE',
//             button_color     : '#FFFFFF'
//         },
//         /*account_settings: {
//             background   : '#FEFEFF',
//             header_color : '#77777D',
//             border       : '#ECF0F6',
//             value        : '#28272D',
//             input      : '#EBEFF3',
//             input_label_color: '#8E8E93',
//             input_color: '#28272D',
//             line_color : '#ECF0F6',
//             button_background: '#7A3DAE',
//             button_color     : '#FFFFFF'
//         },*/
//         /*chat: {
//             bkg_color: '#FEFEFF',
//             bkg2_color: '#F5F8FC',
//             separate_line_color: '#ECF0F6',
//             text_line1_color: '#28272D',
//             text_line2_color: '#77777D',
//             unread_container_color: '#7A3DAE',
//             unread_container_text_color: '#FFFFFF',
//             avatar_bkg_color: '#ECF0F6',
//             avatar_sign_color: '#000000',
//             msg_bkg_color: '#FFFFFF',
//             msg_my_bkg_color: '#E4E7EC',
//             msg_border_color: '#CFD4DE',
//
//             text_tech_color: '#77777D',
//             msg_tech_bkg_color: '#FFFFFF',
//
//             wallpaper_img: require('../../assets/img/chat/chat_wallpaper_light.jpg'),
//             topBarLeftButtonColor: '#FDFDFD',
//             topBarRightButtonColor: '#FDFDFD',
//             header_text_color_row1: '#FFFFFF',
//             header_text_color_row2: '#FDFDFD',
//         },*/
//         /*coupons: {
//             background      : '#FFFFFF',
//             input           : '#EBEFF3',
//             input_color     : '#8F9198',
//             copy_color      : '#8F9198',
//             copy_background : '#d3d6da',
//             code_color      : '#28272D'
//         },*/
//         reservation: {
//             background : '#FEFEFF',
//             label      : '#8F9198',
//             value      : '#28272D',
//             border     : '#ECF0F6',
//             button_background : '#EBEFF3',
//             button_color      : '#77777D',
//             item_background: '#FFFFFF',
//             last_item_background: '#EBEFF3',
//             not_found_background : '#ECF0F6',
//             not_found_value      : '#28272D'
//         },
//         reservation_item:{
//             text_light: '#766587',
//             text: '#2c2436',
//         },
//         /*finish_reservation: {
//             background          : '#FFFFFF',
//             accent_background   : '#7A3DAE',
//             accent_color        : '#FFFFFF',
//             cancel_color        : '#FFFFFF',
//             label               : '#6A6A6A',
//             value               : '#28272D',
//             icon_color          : '#7A3DAE',
//         },*/
//         balance: {
//             background           : '#FEFEFF',
//             label                : '#77777D',
//             value                : '#28272D',
//             border               : '#ECF0F6',
//             payout_background    : '#7A3DAE',
//             payout_color         : '#FFFFFF',
//             add_funds_background : '#ECF0F6',
//             add_funds_color      : '#77777D',
//             cancel_background    : '#ECF0F6',
//             cancel_color         : '#77777D',
//             tabs_indicator       : '#FFFFFF'
//         },
//         /*payout: {
//             background           : '#FFFFFF',
//             label                : '#8F9198',
//             value                : '#28272D',
//             border               : '#ECF0F6',
//             input                : '#EBEFF3',
//             cancel_background    : '#ECF0F6',
//             cancel_color         : '#77777D',
//             confirm_amount_background : '#FFFFFF',
//             confirm_amount_color      : '#28272D',
//             confirm_background        : '#7A3DAE',
//             confirm_color             : '#FFFFFF'
//         },*/
//         /*add_funds: {
//             background: '#fefeff',
//             input: '#e7ecf3',
//             label: '#8E8E93',
//             value: '#28272D'
//         },*/
//         /*radar: {
//             background: '#FEFEFF',
//             label: '#28272D',
//             value: '#77777D',
//             border: '#3D3D3D',
//             close_button_background : '#ECF0F6',
//             close_button_color      : '#77777D',
//             confirm_button_background : '#7A3DAE',
//             confirm_button_color      : '#FFFFFF'
//         },*/
//         /*active_reservation: {
//             background        : '#FFFFFF',
//             accent_background : '#F5F8FC',
//             label             : '#77777D',
//             value             : '#28272D',
//             border            : '#F0F0F3',
//             slide_background  : '#7A3DAE',
//             slide_color       : '#FFFFFF',
//             button_background  : '#FFFFFF',
//             button_color       : '#7A3DAE',
//         },*/
//         /*report: {
//             value: '#000000',
//             label: '#6A6A6A',
//             confirm_background : '#7A3DAE',
//             confirm_color      : '#FFFFFF',
//             cancel_background    : '#ECF0F6',
//             cancel_color         : '#77777D',
//             active_type_background   : '#7A3DAE',
//             active_type_color        : '#FFFFFF',
//             inactive_type_background : '#F6F6F6',
//             inactive_type_color      : '#7A3DAE',
//             input                    : '#EFEFEF',
//             input_color              : '#6A6A6A'
//         },*/
//         /*payments: {
//             background: '#FEFEFF',
//             bottom_background: '#EBEFF3',
//             label: '#77777D',
//             value: '#28272D',
//             border: '#ECF0F6',
//             button_background : '#7A3DAE',
//             button_color      : '#FFFFFF'
//         }*/
//     }
// };
//
// const UserDefaultsManager = NativeModules.UserDefaultsManager;
// let current_theme = 'light';
// if(UserDefaultsManager && UserDefaultsManager.theme && UserDefaultsManager.theme.length > 0) {
//     //TODO need to add an available theme value check
//     current_theme = UserDefaultsManager.theme;
// }
//
//
// export class Theme {
//
//     constructor() {
//         this.theme = themes[current_theme];
//     }
//
//     setTheme(theme) {
//         UserDefaultsManager.setTheme(theme);
//         UserDefaultsManager.Restart();
//     }
//
//     getTheme() {
//         return this.theme
//     }
// }
//
// module.exports = new Theme();