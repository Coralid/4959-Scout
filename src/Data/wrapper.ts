class DataItem {

    title: string;
    values: {
        [key: string]: {
            path: string;
            value: any;
        }
    }

    constructor(title: string) {
        this.title = title;
        this.values = {};
    }

    append(path: string, value: any) {
        this.values[path.substring(path.lastIndexOf('/') + 1)] = {
            path: path,
            value: value
        }
    }

}

export default DataItem;