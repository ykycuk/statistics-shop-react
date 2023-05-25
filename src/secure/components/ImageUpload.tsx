import React, {useState} from 'react';
import axios from "axios";

type Props = {
    value: string,
    imageChanged: (image: string) => void
}

const ImageUpload: React.FC<Props> = ({value, imageChanged}) => {

        async function uploadFile(files: FileList | null) {
            if (files === null) return;

            const data = new FormData();
            data.append('image', files[0]);

            const response = await axios.post('upload', data);

            imageChanged(response.data.url);
        }


        return (
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={value}
                    onChange={e => imageChanged(e.target.value)}
                />
                <div className="input-group-append">
                    <label className="btn btn-primary">
                        Upload
                        <input
                            type="file"
                            hidden
                            onChange={e => uploadFile(e.target.files)}
                        />
                    </label>
                </div>
            </div>
        );
    }
;

export default ImageUpload;