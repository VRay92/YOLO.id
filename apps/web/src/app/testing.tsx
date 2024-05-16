import * as React from 'react';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  function getFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      console.log('Selected file:', file);
      // You can do further processing with the file here
    } else {
      console.log('No file selected.');
    }
  }
  return (
    <div>
      <input type="file" id="fileInput" />
      <button onClick={getFile}>Get File</button>
    </div>
  );
};

export default App;
