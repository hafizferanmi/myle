import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const settings_config = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/settings',
            component: FuseLoadable({
                loader: () => import('./Settings')
            })
        }
    ]
};
