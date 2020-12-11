import React, { useState, useContext } from "react";
import styles from "./UsersPlace.scss";
import { UserT } from "../TypesTS/UserT";
import { Context } from "../handlerContext";
import UserDisplay from "../UserDisplay/UserDisplay";
// contain main functionality containing storing deleting etc. for clients
export default function UsersPlace() {
  const [users, setUser] = useState<UserT[]>([
    {
      userID: "1",
      email: "hayu@gmail.com",
      password: "12345",
      phone: "+79057372242",
      name: "Hay hay hay",
      status: "Partner",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "2",
      email: "hafffyu@gmail.com",
      password: "12345",
      phone: "+79057372242",
      name: "Hay hay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
  ]);
  const [usersToShow, setShowUsers] = useState(users);
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
  const filterByStatus = (criteria: string) => {
    let usersFiltered = users;
    if (criteria === "Empty") {
      usersFiltered = users;
    } else {
      usersFiltered = usersFiltered.filter(function(user) {
        return user.status === criteria;
      });
    }
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
      document.getElementById("name").className = styles.error;
      document.getElementById("email").className = styles.error;
      document.getElementById("password").className = styles.error;
      document.getElementById("phone").className = styles.error;
      document.getElementById("rbuttons").className = styles.error;
      setErrorStatus(styles.visible);
    } else if (!userName.match(/([A-Za-z]+\s){2}([A-Za-z]+$)/)) {
      document.getElementById("name").className = styles.error;
      setErrorText("Wrong name!");
      setErrorStatus(styles.visible);
    } else if (
      !userMail.match(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ) {
      setErrorText("Wrong email!");
      setErrorStatus(styles.visible);
      document.getElementById("email").className = styles.error;
    } else if (!userPhone.match(/^\+?7(\d{10})$/)) {
      setErrorText("Please inter phone in +7 format");
      setErrorStatus(styles.visible);
      document.getElementById("phone").className = styles.error;
    } else if (userStatus === "unchanged") {
      setErrorText("You haven't chosen the status of user!");
      setErrorStatus(styles.visible);
      document.getElementById("rbuttons").className = styles.error;
    } else {
      setErrorText("none");
      setErrorStatus(styles.invisible);
      addUser();
    }
  };
  const [errorText, setErrorText] = useState<string>("none");
  const [errorStatus, setErrorStatus] = useState(styles.invisible);
  const [userName, setUserName] = useState<string>("");
  const [userMail, setUserMail] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("unchanged");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");

  return (
    <Context.Provider value={{ users, setUser }}>
      <div className={styles.container}>
        <div className={styles.addUserContainer}>
          <form>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className={styles.inputInfo}
              onChange={(event) => setUserName(event.target.value)}
            ></input>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={styles.inputInfo}
              onChange={(event) => setUserMail(event.target.value)}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className={styles.inputInfo}
              onChange={(event) => setUserPassword(event.target.value)}
            ></input>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              className={styles.inputInfo}
              onChange={(event) => setUserPhone(event.target.value)}
            ></input>
            <p>Status</p>
            <div id="rbuttons" className={styles.radiobuttonsCont}>
              <div>
                <input
                  type="radio"
                  name="status"
                  id="Client"
                  value="1"
                  onChange={(event) => setUserStatus(event.target.id)}
                ></input>
                <label htmlFor="Client">Client</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="status"
                  id="Partner"
                  onChange={(event) => setUserStatus(event.target.id)}
                ></input>
                <label htmlFor="Partner">Partner</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="status"
                  id="Admin"
                  onChange={(event) => setUserStatus(event.target.id)}
                ></input>
                <label htmlFor="Admin">Admin</label>
              </div>
            </div>
          </form>
          <div className={errorStatus}>{errorText}</div>
          <button
            className={styles.buttonitself}
            onClick={() => processAdding()}
          >
            Add user
          </button>
        </div>
        <div className={styles.usersList}>
          <div className={styles.filterContainer}>
            <select
              id="selectedClass"
              onChange={() =>
                filterByStatus(
                  (document.getElementById(
                    "selectedClass"
                  ) as HTMLSelectElement).value
                )
              }
            >
              <option value="Empty">Empty</option>
              <option value="Client">Client</option>
              <option value="Partner">Partner</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {users?.map((item) => (
            <UserDisplay key={item.userID} user={item}></UserDisplay>
          ))}
        </div>
      </div>
    </Context.Provider>
  );
}
