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
  flex: 3;
  position: relative;

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Section = styled.div`
  flex: 1;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #333;
`;

const SpecItem = styled.p`
  margin: 0 0 10px 0;
  
  strong {
    color: #333;
  }
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #555;
`;

function CarPostView({ post }) {
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
                <Section>
                    <SectionTitle>Specifications</SectionTitle>
                    <SpecItem>
                        <strong>Years of production:</strong> {post.car_years || ''}
                    </SpecItem>
                    <SpecItem>
                        <strong>Body type:</strong> {post.car_bodytype || ''}
                    </SpecItem>
                    <SpecItem>
                        <strong>Engine types:</strong> {post.car_engines || ''}
                    </SpecItem>
                </Section>
            </Row>

            <Row>
                <Section>
                    <SectionTitle>Description</SectionTitle>
                    <Description>{post.content || ''}</Description>
                </Section>
            </Row>
        </Container>
    );
}

export default CarPostView;
