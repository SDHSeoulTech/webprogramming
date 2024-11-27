'use client'
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import Writer from "./writer";
import Bars from '../bars';
import { QueryClient, QueryClientProvider } from 'react-query';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

export default function Home() {
  const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그를 저장하는 상태

  // 미리 정의된 태그 목록
  const tagOptions = [
    "기술", "문화", "음악", "예술", "여행", "스포츠", "음식", "건강", "취미", "연애"
  ];

  // 태그 선택 이벤트 핸들러
  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]); // 선택된 태그에 추가
    }
  };

  // 선택된 태그 삭제 이벤트 핸들러
  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag)); // 선택된 태그에서 제거
  };

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Bars></Bars>
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={10} lg={8} className="mt-5 mb-4">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <FormControl type="text" placeholder="제목을 입력하세요" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <div className="position-relative">
                <Form.Group className="mb-3">
                  <Form.Select aria-label="태그 선택" onChange={(e) => handleTagSelect(e.target.value)}>
                    <option>태그를 선택하세요</option>
                    {tagOptions.map((tag, index) => (
                      <option key={index} value={tag}>{tag}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <div className="position-absolute w-100" style={{ top: "-40px" }}>
                  {selectedTags.map((tag, index) => (
                    <Button key={index} variant="outline-primary" size="sm" className="me-2 mb-2" onClick={() => handleTagRemove(tag)}>
                      {tag} <span>&times;</span> {/* 선택된 태그 삭제 버튼 */}
                    </Button>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          <Writer />
          <Row className="mt-4">
          <Col className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2">임시 저장</Button>
            <Button variant="primary">작성하기</Button>
          </Col>
        </Row>
        </Col>
      </Row>
    </Container>
    </QueryClientProvider>,
    </>
  );
}
