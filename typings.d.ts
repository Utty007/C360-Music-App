export type albumData = {
    albums: {
        items: [{
            data: {
                uri: string,
                name: string,
                artists: {
                    items: [{
                    uri: string,
                    profile: {
                        name: string
                    }
                }]},
                coverArt: {
                    sources: [{
                        url: string
                        width: number
                        height: number
                    }]
                },
                date: {
                    year: number
                }
            }
        }]
    }
}

export type propsData = {
    name: string;
    artists: [
        {name: string}
    ]
    release_date: string;
    type: string;
    images: [{
        url: string
    }];
    id: string;
    album_type: string
}

export type songsData = {
    album: {
        name: string,
        images: [{
            url: string;
            width: number;
            height: number;
        }]
    };
    artists: [{name: string}]
    name: string;
    href: string; 
    preview_url: string;
    uri: string;
}