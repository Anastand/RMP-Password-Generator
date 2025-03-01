import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  // for the length of the passowrd ==> CAN BE CHANGED LATER ON
  const [numberAllowed, setnumberAllowed] = useState(false);
  // for checking if number is allowed or nor ==> WILL BE A TOGGLE FOR US TO DO
  const [chatrAllowed, setchatrAllowed] = useState(false);
  // for checking if character is allowed or nor ==> WILL BE A TOGGLE FOR US TO DO
  const [passowrd, setpassword] = useState("");

  const passwordref = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chatrAllowed) {
      str += "!@$%^&*+#";
    }
    if (numberAllowed) {
      str += "0123456789";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setpassword(pass);
  }, [numberAllowed, chatrAllowed, length]);

  useEffect(() => {
    generatePassword();
  }, [numberAllowed, chatrAllowed, length]);

  const copytoclipboard = () => {
    window.navigator.clipboard.writeText(passowrd);
    passwordref.current.select();
    alert("Password Copied");
  };

  return (
    <div className="bg-gray-800 w-full h-screen p-20">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 drop-shadow-lg outline-gray-700 text-blue-200">
        <h1 className="text-gray-300 text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={passowrd}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600 "
            onClick={copytoclipboard}
          >
            COPY
          </button>
        </div>
        <div className="felx gap-x-2">
          <div className="flex item-center gap-x-4">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer "
              onChange={(e) => setlength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">{length}</label>
          </div>
          <div className="flex item-center gap-x-4">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="Numbers">NUMBERS</label>
          </div>
          <div className="flex item-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={chatrAllowed}
              onChange={() => {
                setchatrAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="CharacterAllowed">CHARACTERS</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
