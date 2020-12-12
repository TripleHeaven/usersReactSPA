import React, { useState, useEffect } from "react";
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
    {
      userID: "4",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "5",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "6",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "7",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "8",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "9",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "9333",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
    {
      userID: "10",
      email: "ha3fffyu@gmail.com",
      password: "12345",
      phone: "+71057372242",
      name: "Hay fffffhay hay",
      status: "Client",
      dateCreated: new Date(),
      lastChange: new Date(),
    },
  ]);
  // users to show is a copy of all users
  const [usersToShow, setShowUsers] = useState(users);
  useEffect(() => {
    setShowUsers(users);
  }, [users]);
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
  const filterByMain = () => {
    filterByStatus(
      (document.getElementById("selectedClass") as HTMLSelectElement).value
    );
  };
  const filterByStatus = (criteria: string) => {
    if (criteria === "Empty") {
      setShowUsers(users);
    } else {
      const newShowUsers = users.filter(function(user) {
        return user.status === criteria;
      });
      setShowUsers(newShowUsers);
    }
  };
  const filterThing = (letter: string, phoneN: string) => {
    let newShowUsers = users;
    if (document.getElementById("selectedClass").value === "Empty") {
      setShowUsers(users);
    } else {
      newShowUsers = newShowUsers.filter(function(user) {
        return user.status === document.getElementById("selectedClass").value;
      });
    }
    newShowUsers = newShowUsers.filter((userItem) => {
      return userItem.email.toLowerCase().includes(letter);
    });
    newShowUsers = newShowUsers.filter((userItem) => {
      return userItem.phone.toLowerCase().includes(phoneN);
    });
    setShowUsers(newShowUsers);
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
    } else if (!userName.match(/([A-Za-z]+\s){2}([A-Za-z]+$)/)) {
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
      setErrorText("Please inter phone in +7 format");
      setErrorStatus(styles.visible);
      (document.getElementById("phone") as HTMLInputElement).className =
        styles.error;
    } else if (userStatus === "unchanged") {
      setErrorText("You haven't chosen the status of user!");
      setErrorStatus(styles.visible);
      (document.getElementById("rbuttons") as HTMLInputElement).className =
        styles.errorRb;
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
  const [seatchField, setSearch] = useState<string>("");
  const [seatchFieldPhone, setSearchPhone] = useState<string>("");
  return (
    <Context.Provider value={{ users, setUser }}>
      <div className={styles.container}>
        <div className={styles.addUserContainer}>
          <form>
            <div className={styles.formTbs}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className={styles.inputInfo}
                onChange={(event) => setUserName(event.target.value)}
              ></input>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className={styles.inputInfo}
                onChange={(event) => setUserMail(event.target.value)}
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                className={styles.inputInfo}
                onChange={(event) => setUserPassword(event.target.value)}
              ></input>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
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
          <button
            className={styles.buttonitself}
            onClick={() => processAdding()}
          >
            Add user
          </button>
        </div>
        <div className={styles.usersList}>
          <div className={styles.filterContainer}>
            <div className={styles.filterLabel}>Filter by status</div>
            <select
              id="selectedClass"
              onChange={() =>
                filterThing(document.getElementById("searchText").value)
              }
            >
              <option value="Empty">Empty</option>
              <option value="Client">Client</option>
              <option value="Partner">Partner</option>
              <option value="Admin">Admin</option>
            </select>
            <div className={styles.filterLabel}>Filter by email</div>
            <input
              id="searchText"
              onChange={(e) => {
                setSearch(e.target.value);
                filterThing(
                  document.getElementById("searchText").value,
                  document.getElementById("searchPhone").value
                );
              }}
              type="text"
              value={seatchField}
            ></input>
            <div className={styles.filterLabel}>Filter by phone</div>
            <input
              id="searchPhone"
              type="text"
              onChange={(e) => {
                setSearchPhone(e.target.value);
                filterThing(
                  document.getElementById("searchText").value,
                  document.getElementById("searchPhone").value
                );
              }}
              value={seatchFieldPhone}
            ></input>
          </div>
          <div className={styles.usersTable}>
            {usersToShow.map((item) => (
              <UserDisplay key={item.userID} user={item}></UserDisplay>
            ))}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}
