import styled, {css} from "styled-components";

export const BgImage = styled.div`
    max-width: 450px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: white;
    text-decoration: none;
    background-color: #e0e0e0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: ${props => props.imgSrc ? `url(${props.imgSrc})` : 'none'};
        background-size: cover;
        background-position: center;
        z-index: 1;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
        z-index: 2;
        transition: background 0.3s;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        text-decoration: none;
    }

    > a {
        text-decoration: none;
        color: inherit;
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;