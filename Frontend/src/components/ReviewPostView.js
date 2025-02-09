import React from 'react';
import styled from 'styled-components';
import PhotoCarousel from './PhotoCarousel';

const Container = styled.div`
  padding: 20px 50px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const PhotoSection = styled.div`
  flex: 2;
  position: relative;
`;

const IntroSection = styled.div`
  flex: 1;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ReviewSection = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #333;
`;

const SectionText = styled.p`
  line-height: 1.6;
  color: #555;
  margin: 0;
`;

function ReviewPostView({ post }) {
    const photos = [];
    if (post.image1) photos.push(post.image1);
    if (post.image2) photos.push(post.image2);
    if (post.image3) photos.push(post.image3);
    if (post.image4) photos.push(post.image4);

    return (
        <Container>
            <Title>{post.title}</Title>

            <Row>
                <PhotoSection>
                    <PhotoCarousel photos={photos} />
                </PhotoSection>
                <IntroSection>
                    <SectionTitle>Introduction</SectionTitle>
                    <SectionText>
                        {post.review_intro || 'No text for introduction section...'}
                    </SectionText>
                </IntroSection>
            </Row>

            <ReviewSection>
                <SectionTitle>Driving Experience</SectionTitle>
                <SectionText>
                    {post.review_driving || 'No text for driving experience section...'}
                </SectionText>
            </ReviewSection>

            <ReviewSection>
                <SectionTitle>Design and Comfort</SectionTitle>
                <SectionText>
                    {post.review_design || 'No text for design and comfort section...'}
                </SectionText>
            </ReviewSection>
        </Container>
    );
}

export default ReviewPostView;
