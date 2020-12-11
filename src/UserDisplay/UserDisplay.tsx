import React, { useState, useContext, useEffect } from "react";
import styles from "./UserDisplay.scss";
import { UserT } from "../TypesTS/UserT";
import { Context } from "../handlerContext";
// contain main functionality containing storing deleting etc. for clients
export default function UserDisplay({ user }: { user: UserT }) {
  const { users, setUser } = useContext(Context);
  useEffect(() => {
    if (user.status === "Client") {
      (document.getElementById("UClient") as HTMLInputElement).checked = true;
    } else if (user.status === "Partner") {
      (document.getElementById("UPartner") as HTMLInputElement).checked = true;
    } else {
      (document.getElementById("UAdmin") as HTMLInputElement).checked = true;
    }
  }, []);
  const deleteUser = () => {
    setUser(
      users.filter((user: UserT) => {
        return user.userID !== user.userID;
      })
    );
  };
  const processEditing = () => {
    if (
      userName === "" ||
      userMail === "" ||
      userPassword === "" ||
      userPhone === ""
    ) {
      setErrorText("Not all fields are filled!");
      document.getElementById("uname").className = styles.error;
      document.getElementById("umail").className = styles.error;
      document.getElementById("password").className = styles.error;
      document.getElementById("phone").className = styles.error;
      document.getElementById("rbuttons").className = styles.error;
      setErrorStatus(styles.visible);
      return false;
    } else if (!userName.match(/([A-Za-z]+\s){2}([A-Za-z]+$)/)) {
      document.getElementById("uname").className = styles.error;
      setErrorText("Wrong name!");
      setErrorStatus(styles.visible);
      return false;
    } else if (
      !userMail.match(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ) {
      setErrorText("Wrong email!");
      setErrorStatus(styles.visible);
      document.getElementById("umail").className = styles.error;
      return false;
    } else if (!userPhone.match(/^\+?7(\d{10})$/)) {
      setErrorText("Please inter phone in +7 format");
      setErrorStatus(styles.visible);
      document.getElementById("uphone").className = styles.error;
      return false;
    } else {
      const newUsers = users;
      for (let i = 0; i < users.length; i++) {
        if (users[i].userID === user.userID) {
          users[i] = {
            userID: user.userID,
            email: userMail,
            password: userPassword,
            phone: userPhone,
            name: userName,
            status: userStatus,
            dateCreated: user.dateCreated,
            lastChange: new Date(),
          };
        }
      }
      setUser(newUsers);
      setErrorText("none");
      setErrorStatus(styles.invisible);
      return true;
      // addUser();
    }
  };
  const showDate = (m: Date): string => {
    const toDisplayTime = (timeValue: string): string => {
      if (timeValue.length < 2) {
        return "0" + timeValue;
      } else {
        return timeValue;
      }
    };
    return (
      m.getUTCFullYear() +
      "/" +
      (m.getUTCMonth() + 1) +
      "/" +
      m.getUTCDate() +
      " " +
      toDisplayTime(m.getUTCHours().toString()) +
      ":" +
      toDisplayTime(m.getUTCMinutes().toString())
    );
  };
  const enterEditMod = () => {
    setContStyle(styles.userCardContainerEdit);
    setEditButtonTxt("Done");
    (document.getElementById("uname") as HTMLInputElement).readOnly = false;
    (document.getElementById("uphone") as HTMLInputElement).readOnly = false;
    (document.getElementById("umail") as HTMLInputElement).readOnly = false;
    (document.getElementById("upassword") as HTMLInputElement).readOnly = false;
    (document.getElementById("UClient") as HTMLInputElement).disabled = false;
    (document.getElementById("UPartner") as HTMLInputElement).disabled = false;
    (document.getElementById("UAdmin") as HTMLInputElement).disabled = false;
  };

  const exitEditMod = () => {
    if (processEditing()) {
      setContStyle(styles.userCardContainer);
      setEditButtonTxt("Edit");
      (document.getElementById("uname") as HTMLInputElement).readOnly = true;
      (document.getElementById("uphone") as HTMLInputElement).readOnly = true;
      (document.getElementById("umail") as HTMLInputElement).readOnly = true;
      (document.getElementById(
        "upassword"
      ) as HTMLInputElement).readOnly = true;
      (document.getElementById("UClient") as HTMLInputElement).disabled = true;
      (document.getElementById("UPartner") as HTMLInputElement).disabled = true;
      (document.getElementById("UAdmin") as HTMLInputElement).disabled = true;
    }
    setLastChanged(new Date());
    setContStyle(styles.userCardContainer);
  };
  const actionEditHandler = () => {
    if (containerStyle === styles.userCardContainerEdit) {
      exitEditMod();
    } else {
      enterEditMod();
    }
  };
  const [containerStyle, setContStyle] = useState(styles.userCardContainer);
  const [errorText, setErrorText] = useState<string>("none");
  const [errorStatus, setErrorStatus] = useState(styles.invisible);
  const [userName, setUserName] = useState<string>(user.name);
  const [userMail, setUserMail] = useState<string>(user.email);
  const [userStatus, setUserStatus] = useState<string>(user.status);
  const [userPassword, setUserPassword] = useState<string>(user.password);
  const [userPhone, setUserPhone] = useState<string>(user.phone);
  const [editButtonTxt, setEditButtonTxt] = useState<string>("Edit");
  const [lastChanged, setLastChanged] = useState(user.lastChange);
  return (
    <div className={containerStyle}>
      <textarea
        id="uname"
        onChange={(event) => setUserName(event.target.value)}
        className={styles.unstyled}
        value={userName}
        readOnly
      ></textarea>
      <textarea
        id="uphone"
        onChange={(event) => setUserPhone(event.target.value)}
        className={styles.unstyled}
        value={userPhone}
        readOnly
      ></textarea>
      <textarea
        id="umail"
        onChange={(event) => setUserMail(event.target.value)}
        className={styles.unstyled}
        value={userMail}
        readOnly
      ></textarea>
      <textarea
        id="upassword"
        onChange={(event) => setUserPassword(event.target.value)}
        className={styles.unstyled}
        value={userPassword}
        readOnly
      ></textarea>
      <div id="rbuttons" className={styles.radiobuttonsCont}>
        <div>
          <input
            type="radio"
            name="status"
            id="UClient"
            value="1"
            onChange={(event) => setUserStatus("Client")}
            disabled
          ></input>
          <label htmlFor="UClient">Client</label>
        </div>
        <div>
          <input
            type="radio"
            name="status"
            id="UPartner"
            onChange={(event) => setUserStatus("Partner")}
            disabled
          ></input>
          <label htmlFor="UPartner">Partner</label>
        </div>
        <div>
          <input
            type="radio"
            name="status"
            id="UAdmin"
            onChange={(event) => setUserStatus("Admin")}
            disabled
          ></input>
          <label htmlFor="UAdmin">Admin</label>
        </div>
      </div>
      <p>{showDate(user.dateCreated)}&nbsp;</p>
      <p>{showDate(lastChanged)}</p>

      <button onClick={() => actionEditHandler()}>{editButtonTxt}</button>
      <button onClick={() => deleteUser()}>Delete</button>
      <div className={errorStatus}>{errorText}</div>
    </div>
  );
}
