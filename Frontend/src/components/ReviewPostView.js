import React from 'react';
import styled from 'styled-components';
import PhotoCarousel from './PhotoCarousel';

const Container = styled.div`
    padding: 20px 50px;
    background-color: #f9f9f9;
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h1`
    margin-bottom: 20px;
    color: #333;
`;

const ContentLayout = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 2rem;
    align-items: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PhotoSection = styled.div`
    position: sticky;
    top: 2rem;
    
    @media (max-width: 768px) {
        position: static;
        margin-bottom: 2rem;
    }
`;

const Section = styled.div`
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
            
            <ContentLayout>
                <TextContent>
                    <Section>
                        <SectionTitle>Introduction</SectionTitle>
                        <SectionText>
                            {post.review_intro || 'No text for introduction section...'}
                        </SectionText>
                    </Section>

                    <Section>
                        <SectionTitle>Driving Experience</SectionTitle>
                        <SectionText>
                            {post.review_driving || 'No text for driving experience section...'}
                        </SectionText>
                    </Section>

                    <Section>
                        <SectionTitle>Design and Comfort</SectionTitle>
                        <SectionText>
                            {post.review_design || 'No text for design and comfort section...'}
                        </SectionText>
                    </Section>
                </TextContent>

                <PhotoSection>
                    <PhotoCarousel photos={photos} />
                </PhotoSection>
            </ContentLayout>
        </Container>
    );
}

export default ReviewPostView;
