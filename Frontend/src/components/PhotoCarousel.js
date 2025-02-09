import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PhotoContainer = styled.div`
  width: 100%;
  position: relative;
`;

const NavButton = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: linear-gradient(
      ${props => props.$direction === 'left' ? 
        'to right, rgba(0,0,0,0.1), transparent' : 
        'to left, rgba(0,0,0,0.1), transparent'
      }
    );
  }
`;

const LeftNav = styled(NavButton)`
  left: 0;
`;

const RightNav = styled(NavButton)`
  right: 0;
`;

function arrayBufferToBase64(buffer) {
    if (!buffer) return '';
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function PhotoCarousel({ photos = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!photos.length) {
        return <div>No photos</div>;
    }

    const handlePrevPhoto = (e) => {
        e.stopPropagation();
        setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
    };

    const handleNextPhoto = (e) => {
        e.stopPropagation();
        setCurrentIndex((currentIndex + 1) % photos.length);
    };

    let base64String = '';
    const currentPhoto = photos[currentIndex];
    if (currentPhoto.data) {
        base64String = arrayBufferToBase64(currentPhoto.data);
    } else if (typeof currentPhoto === 'string') {
        base64String = currentPhoto;
    }

    const mainPhotoSrc = `data:image/png;base64,${base64String}`;

    return (
        <CarouselContainer>
            <PhotoContainer>
                <img
                    src={mainPhotoSrc}
                    alt={`photo-${currentIndex}`}
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                />
                <LeftNav 
                    $direction="left"
                    onClick={handlePrevPhoto}
                    title="Previous photo"
                />
                <RightNav 
                    $direction="right"
                    onClick={handleNextPhoto}
                    title="Next photo"
                />
            </PhotoContainer>
        </CarouselContainer>
    );
}

export default PhotoCarousel;
