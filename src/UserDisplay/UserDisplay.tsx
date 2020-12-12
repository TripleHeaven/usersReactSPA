import React, { useState, useContext, useEffect } from "react";
import styles from "./UserDisplay.scss";
import { UserT } from "../TypesTS/UserT";
import { Context } from "../handlerContext";
// contain main functionality containing storing deleting etc. for clients
export default function UserDisplay({ user }: { user: UserT }) {
  const { users, setUser } = useContext(Context);
  useEffect(() => {
    if (user.status === "Client") {
      (document.getElementById(UClient) as HTMLInputElement).checked = true;
    } else if (user.status === "Partner") {
      (document.getElementById(UPartner) as HTMLInputElement).checked = true;
    } else {
      (document.getElementById(UAdmin) as HTMLInputElement).checked = true;
    }
  }, []);
  const deleteUser = () => {
    setUser(
      users.filter((item: UserT) => {
        return user.userID !== item.userID;
      })
    );
  };
  const processEditing = () => {
    if (userName === "" || userMail === "" || userPhone === "") {
      setErrorText("Not all fields are filled!");
      (document.getElementById(
        nametxtID
      ) as HTMLInputElement).style.backgroundColor = "red";
      (document.getElementById(
        mailtxtID
      ) as HTMLInputElement).style.backgroundColor = "red";
      (document.getElementById(
        passwordtxtID
      ) as HTMLInputElement).style.backgroundColor = "red";
      (document.getElementById(
        phonetxtID
      ) as HTMLInputElement).style.backgroundColor = "red";
      setErrorStatus(styles.visible);
      return false;
    } else if (!userName.match(/([A-Za-z]+\s){2}([A-Za-z]+$)/)) {
      (document.getElementById(
        nametxtID
      ) as HTMLInputElement).style.backgroundColor = "red";
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
      (document.getElementById(
        mailtxtID
      ) as HTMLInputElement).style.backgroundColor = "red";
      return false;
    } else if (!userPhone.match(/^\+?7(\d{10})$/)) {
      setErrorText("Please inter phone in +7 format");
      setErrorStatus(styles.visible);
      (document.getElementById(
        phonetxtID
      ) as HTMLInputElement).style.backgroundColor = "red";
      return false;
    } else if (document.getElementById(passwordtxtID).value === "") {
      document.getElementById(passwordtxtID).style.backgroundColor = "red";
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
      m
        .getUTCFullYear()
        .toString()
        .slice(2) +
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
    (document.getElementById(mailtxtID) as HTMLInputElement).readOnly = false;
    (document.getElementById(phonetxtID) as HTMLInputElement).readOnly = false;
    (document.getElementById(mailtxtID) as HTMLInputElement).readOnly = false;
    (document.getElementById(
      passwordtxtID
    ) as HTMLInputElement).readOnly = false;
    (document.getElementById(UClient) as HTMLInputElement).disabled = false;
    (document.getElementById(UPartner) as HTMLInputElement).disabled = false;
    (document.getElementById(UAdmin) as HTMLInputElement).disabled = false;
  };

  const exitEditMod = () => {
    if (processEditing()) {
      setContStyle(styles.userCardContainer);
      setEditButtonTxt("Edit");
      (document.getElementById(nametxtID) as HTMLInputElement).readOnly = true;
      (document.getElementById(phonetxtID) as HTMLInputElement).readOnly = true;
      (document.getElementById(mailtxtID) as HTMLInputElement).readOnly = true;
      (document.getElementById(
        passwordtxtID
      ) as HTMLInputElement).readOnly = true;
      (document.getElementById(
        nametxtID
      ) as HTMLInputElement).style.backgroundColor = "white";
      (document.getElementById(phonetxtID) as any).style.backgroundColor =
        "white";
      (document.getElementById(mailtxtID) as any).style.backgroundColor =
        "white";
      (document.getElementById(passwordtxtID) as any).backgroundColor = "white";
      (document.getElementById(phonetxtID) as HTMLInputElement).readOnly = true;
      (document.getElementById(mailtxtID) as HTMLInputElement).readOnly = true;
      (document.getElementById(
        passwordtxtID
      ) as HTMLInputElement).readOnly = true;
      (document.getElementById(UClient) as HTMLInputElement).disabled = true;
      (document.getElementById(UPartner) as HTMLInputElement).disabled = true;
      (document.getElementById(UAdmin) as HTMLInputElement).disabled = true;
      setLastChanged(new Date());
      setContStyle(styles.userCardContainer);
    }
  };
  const actionEditHandler = () => {
    if (containerStyle === styles.userCardContainerEdit) {
      exitEditMod();
    } else if (!processEditing()) {
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

  // getting unique id names for attributes
  const nametxtID = user.userID.toString() + userName;
  const phonetxtID = user.userID.toString() + userPhone;
  const passwordtxtID = user.userID.toString() + userPassword;
  const mailtxtID = user.userID.toString() + userMail;
  const rbuttonsID = user.userID.toString() + userStatus;
  const UClient = user.userID.toString() + "client";
  const UPartner = user.userID.toString() + "partner";
  const UAdmin = user.userID.toString() + "admin";

  return (
    <div className={containerStyle}>
      <div className={styles.categoryElement}>
        <div className={styles.categoryName}>Name</div>
        <div className={styles.categoryValue}>
          {" "}
          <input
            type="text"
            id={nametxtID}
            onChange={(event) => setUserName(event.target.value)}
            className={styles.unstyled}
            value={userName}
            readOnly
          ></input>
        </div>
      </div>
      <div className={styles.categoryElement}>
        <div className={styles.categoryName}>Phone</div>
        <div className={styles.categoryValue}>
          <input
            type="text"
            id={phonetxtID}
            onChange={(event) => setUserPhone(event.target.value)}
            className={styles.unstyled}
            value={userPhone}
            readOnly
          ></input>
        </div>
      </div>
      <div className={styles.categoryElement}>
        <div className={styles.categoryName}>Email</div>
        <div className={styles.categoryValue}>
          <input
            type="text"
            id={mailtxtID}
            onChange={(event) => setUserMail(event.target.value)}
            className={styles.unstyled}
            value={userMail}
            readOnly
          ></input>
        </div>
      </div>
      <div className={styles.categoryElement}>
        <div className={styles.categoryName}>Password</div>
        <div className={styles.categoryValue}>
          {" "}
          <input
            type="text"
            id={passwordtxtID}
            onChange={(event) => setUserPassword(event.target.value)}
            className={styles.unstyled}
            value={userPassword}
            readOnly
          ></input>
        </div>
      </div>
      <form>
        <div className={styles.categoryElement}>
          <div className={styles.categoryName}>Status</div>
          <div className={styles.categoryValue}>
            <div id={rbuttonsID} className={styles.radiobuttonsCont}>
              <div className={styles.rbThing}>
                <input
                  type="radio"
                  name="status"
                  id={UClient}
                  onChange={() => setUserStatus("Client")}
                  disabled
                ></input>
                <label htmlFor={UClient}>Client</label>
              </div>
              <div className={styles.rbThing}>
                <input
                  type="radio"
                  name="status"
                  id={UPartner}
                  onChange={() => setUserStatus("Partner")}
                  disabled
                ></input>
                <label htmlFor={UPartner}>Partner</label>
              </div>
              <div className={styles.rbThing}>
                <input
                  type="radio"
                  name="status"
                  id={UAdmin}
                  onChange={() => setUserStatus("Admin")}
                  disabled
                ></input>
                <label htmlFor={UAdmin}>Admin</label>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.categoryElement}>
        <div className={styles.categoryName}>Created</div>
        <div className={styles.categoryValue}>
          <div className={styles.date}>{showDate(user.dateCreated)}&nbsp;</div>
        </div>
      </div>
      <div className={styles.categoryElement}>
        <div className={styles.categoryName}>Last Change</div>
        <div className={styles.categoryValue}>
          <div className={styles.date}> {showDate(lastChanged)}</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => actionEditHandler()}>{editButtonTxt}</button>
        <button onClick={() => deleteUser()}>Delete</button>
      </div>
    </div>
  );
}
