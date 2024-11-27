import React, { useMemo, useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CustomToolbar } from './customtoolbar';
import Quill from 'quill';
import { useUploadFile } from './upload';

// const Image = Quill.import("formats/image");
// Image.sanitize = (url) => url;


const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
  'image'
];

function Writer() {
  const quillRef = useRef(null);
  const [value, setValue] = useState("");
  // const uploadFileMutation = useUploadFile();

  // const handleImageUpload = async (file) => {
  //   if (!file) {
  //     alert('파일이 선택되지 않았습니다.');
  //     return;
  //   }

  //   if (quillRef.current) {
  //     const editor = quillRef.current.getEditor();
  //     const range = editor.getSelection(true);

  //     try {
  //       const url = URL.createObjectURL(file);
  //       console.log('Generated Image URL:', url); // URL이 올바른지 확인

  //       if (range) {
  //         editor.insertEmbed(range.index, 'image', url);
  //         editor.setSelection(range.index + 1); // 커서를 이미지 뒤로 이동
  //       } else {
  //         alert('에디터에 포커스를 맞추고 다시 시도해주세요.');
  //       }
  //     } catch (error) {
  //       console.error('Failed to create object URL:', error);
  //     }
  //   }
  // };

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    console.log(content);
  };

  // function imageHandler() {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     if (file) {
  //       console.log('Selected file:', file); // 파일이 올바르게 선택되었는지 확인
  //       handleImageUpload(file);
  //     } else {
  //       console.error('No file selected.');
  //     }
  //   };
  // }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        // handlers: {
        //   image: imageHandler
        // },
      },
    };
  }, []);

  useEffect(() => {
    // class CustomImageUploader {
    //   sanitize(url){
    //     return url;
    //   }

    //   constructor(quill, options) {
    //     this.quill = quill;
    //     this.options = options;
    //     const toolbar = this.quill.getModule('toolbar');
    //     toolbar.addHandler('image', this.selectLocalImage.bind(this));
    //   }

    //   selectLocalImage() {
    //     const input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');
    //     input.click();

    //     input.onchange = () => {
    //       const file = input.files[0];
    //       if (file && /^image\//.test(file.type)) {
    //         this.uploadImage(file);
    //       } else {
    //         console.warn('You can only upload images.');
    //       }
    //     };
    //   }

    //   uploadImage(file) {
    //     try {
    //       const url = URL.createObjectURL(file);
    //       console.log('Generated Image URL:', url); // URL이 올바른지 확인

    //       const range = this.quill.getSelection();
    //       if (range) {
    //         this.quill.insertEmbed(range.index, 'image', url);
    //         this.quill.setSelection(range.index + 1); // 커서를 이미지 뒤로 이동
    //       } else {
    //         console.error('Range is null. Could not insert image.');
    //       }
    //     } catch (error) {
    //       console.error('Failed to create object URL:', error);
    //     }
    //   }
    // }

    // Quill.register('modules/customImageUploader', CustomImageUploader);

    // if (quillRef.current) {
    //   const editor = quillRef.current.getEditor();
    //   editor.getModule('toolbar').addHandler('image', imageHandler);
    // }
  }, []);

  return (
    <div>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        // onChange={}
        style={{ height: '400px' }} // 초기 높이 설정
      />
    </div>
  );
}

export default Writer;
