import React from 'react';
import styled from 'styled-components';
import PhotoCarousel from './PhotoCarousel';

const Container = styled.div`
  padding: 20px 50px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const TextSection = styled.div`
  flex: 2;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PhotoSection = styled.div`
  flex: 3;
  position: relative;
`;

const Title = styled.h1`
  margin-bottom: 15px;
  font-family: Arial, sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #333;
`;

const Description = styled.p`
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

function NewsPostView({ post }) {
    const photos = [];
    if (post.image1) photos.push(post.image1);
    if (post.image2) photos.push(post.image2);
    if (post.image3) photos.push(post.image3);
    if (post.image4) photos.push(post.image4);

    return (
        <Container>
            <Row>
                <TextSection>
                    <Title>{post.title}</Title>
                    <Description>{post.news_text}</Description>
                </TextSection>
                <PhotoSection>
                    <PhotoCarousel photos={photos} />
                </PhotoSection>
            </Row>
        </Container>
    );
}

export default NewsPostView;
