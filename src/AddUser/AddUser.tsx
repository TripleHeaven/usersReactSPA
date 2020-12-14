import React, { useState, useContext } from "react";
import styles from "./AddUser.scss";
import { Context } from "../handlerContext";
import RandomClient from "../RandomClient";
// contain main functionality containing storing deleting etc. for clients
export default function AddUser() {
  const { setUser, users } = useContext(Context);
  const [errorText, setErrorText] = useState<string>("none");
  const [errorStatus, setErrorStatus] = useState(styles.invisible);
  const [userName, setUserName] = useState<string>("");
  const [userMail, setUserMail] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("unchanged");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");

  const addUser = () => {
    setUser([
      ...users,
      {
        userID: Date.now().toString(),
        email: userMail,
        password: userPassword,
        phone: userPhone,
        name: userName,
        status: userStatus,
        dateCreated: new Date(),
        lastChange: new Date(),
      },
    ]);
  };
  const processAdding = () => {
    if (
      userName === "" ||
      userMail === "" ||
      userStatus === "unchanged" ||
      userPassword === "" ||
      userPhone === ""
    ) {
      setErrorText("Not all fields are filled!");
      (document.getElementById("name") as HTMLInputElement).className =
        styles.error;
      (document.getElementById("email") as HTMLInputElement).className =
        styles.error;
      (document.getElementById("password") as HTMLInputElement).className =
        styles.error;
      (document.getElementById("phone") as HTMLInputElement).className =
        styles.error;
      (document.getElementById("rbuttons") as HTMLInputElement).className =
        styles.errorRb;
      setErrorStatus(styles.visible);
    } else if (
      !userName.match(/([A-Za-z]|[А-Яа-я]+\s){2}([A-Za-z]|[А-Яа-я]+$)/)
    ) {
      (document.getElementById("name") as HTMLInputElement).className =
        styles.error;
      setErrorText("Wrong name!");
      setErrorStatus(styles.visible);
    } else if (
      !userMail.match(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ) {
      setErrorText("Wrong email!");
      setErrorStatus(styles.visible);
      (document.getElementById("email") as HTMLInputElement).className =
        styles.error;
    } else if (!userPhone.match(/^\+?7(\d{10})$/)) {
      setErrorText("Please inter phone in +79057372242 format");
      setErrorStatus(styles.visible);
      (document.getElementById("phone") as HTMLInputElement).className =
        styles.error;
    } else if (userStatus === "unchanged") {
      setErrorText("You haven't chosen the status of user!");
      setErrorStatus(styles.visible);
      (document.getElementById("rbuttons") as HTMLInputElement).className =
        styles.errorRb;
    } else {
      (document.getElementById("name") as HTMLInputElement).className =
        styles.allOk;
      (document.getElementById("email") as HTMLInputElement).className =
        styles.addUserContainer;
      (document.getElementById("password") as HTMLInputElement).className =
        styles.allOk;
      (document.getElementById("phone") as HTMLInputElement).className =
        styles.allOk;
      (document.getElementById("rbuttons") as HTMLInputElement).className =
        styles.allOk;
      setErrorText("none");
      setErrorStatus(styles.invisible);
      setUserName("");
      setUserMail("");
      setUserPassword("");
      setUserPhone("");
      (document.getElementById("Admin") as HTMLInputElement).checked = false;
      (document.getElementById("Partner") as HTMLInputElement).checked = false;
      (document.getElementById("Client") as HTMLInputElement).checked = false;
      addUser();
    }
  };
  return (
    <div className={styles.addUserContainer}>
      <form>
        <div className={styles.formTbs}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={styles.inputInfo}
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={userMail}
            id="email"
            className={styles.inputInfo}
            onChange={(event) => setUserMail(event.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={userPassword}
            className={styles.inputInfo}
            onChange={(event) => setUserPassword(event.target.value)}
          ></input>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={userPhone}
            className={styles.inputInfo}
            onChange={(event) => setUserPhone(event.target.value)}
          ></input>
        </div>
        <div className={styles.statusChoose}>
          <p>Status</p>
          <div id="rbuttons" className={styles.radiobuttonsCont}>
            <div className={styles.rbInputEl}>
              <input
                type="radio"
                name="status"
                id="Client"
                value="1"
                onChange={(event) => setUserStatus(event.target.id)}
              ></input>

              <label htmlFor="Client">Client</label>
            </div>
            <div className={styles.rbInputEl}>
              <input
                type="radio"
                name="status"
                id="Partner"
                onChange={(event) => setUserStatus(event.target.id)}
              ></input>
              <label htmlFor="Partner">Partner</label>
            </div>
            <div className={styles.rbInputEl}>
              <input
                type="radio"
                name="status"
                id="Admin"
                onChange={(event) => setUserStatus(event.target.id)}
              ></input>
              <label htmlFor="Admin">Admin</label>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.errorBlock}>
        <div className={errorStatus}>{errorText}</div>
      </div>
      <button className={styles.buttonitself} onClick={() => processAdding()}>
        Add user
      </button>
      <RandomClient></RandomClient>
    </div>
  );
}
