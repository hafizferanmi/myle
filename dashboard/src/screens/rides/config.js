import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const rides_config = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/rides',
            component: FuseLoadable({
                loader: () => import('./Rides')
            })
        }
    ]
};