import DataUriParser from 'datauri/parser.js';
import Path from 'path';


const getBuffer = (file) =>{

    const parser = new DataUriParser();
    const extName = Path.extName(file.originalname).toString();

    return parser.format(extName,file.buffer);

};


export default getBuffer;

