const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'rides-component',
                'title': 'Rides',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/rides'
            },
            {
                'id'   : 'drivers-component',
                'title': 'Drivers',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/drivers'
            },
            {
                'id'   : 'driverdetails-component',
                'title': 'Driver Details',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/driver/:id'
            }            
        ]
    }
];

export default navigationConfig;
