import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from 'styled-components';

const TextEditorContainer = styled.div`
  .my-react-quill .ql-editor strong {
    font-weight: 800;
  }

  .my-react-quill .ql-editor em {
    font-style: italic;
  }
`;

const TextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <TextEditorContainer>
      <ReactQuill
        className="my-react-quill"
        modules={modules}
        value={value}
        onChange={onChange}
      />
    </TextEditorContainer>
  );
};

export default TextEditor;
