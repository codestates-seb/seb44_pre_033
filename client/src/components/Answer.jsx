import { useState } from 'react';
import styled from 'styled-components';
import Content from './Content';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function Answer() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
      // editorState에 값 설정
      setEditorState(editorState);
    };
  return (
    <Container>
      <AnswerInfo>
        <div>1 Answer</div>
        <div>
          <label>Sorted by: </label>
          <Select>
            <option value="highest">Highest Score(dafault)</option>
            <option value="newest">Newest</option>
          </Select>
        </div>
      </AnswerInfo>
      <Content />
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const AnswerInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  padding: 0.5rem;
`;
