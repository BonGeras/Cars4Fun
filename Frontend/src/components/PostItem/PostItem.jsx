import React, {useMemo} from 'react';
import { Link } from 'react-router-dom';

import { BgImage } from './styled';
import {arrayBufferToBase64} from "./utils";

const PostItem = ({ post }) => {
    const backgroundImage =  useMemo(() => {
        const base64String = arrayBufferToBase64(post.image1.data || post.image1);
        return `data:image/png;base64,${base64String}`;
    },[post]);

    return (
        <BgImage imgSrc={backgroundImage}>
            <Link to={`/posts/${post.id}`}>
                {post.title}
            </Link>
        </BgImage>
    );
}

export default PostItem;
