import React, { useState, useEffect } from "react";
import styles from "./UsersPlace.scss";
import { UserT } from "../TypesTS/UserT";
import { Context } from "../handlerContext";
import UsersList from "../UsersList/UsersList";
import AddUser from "../AddUser/AddUser";
// contain main functionality containing storing deleting etc. for clients
export default function UsersPlace() {
  const [users, setUser] = useState<UserT[]>([]);
  // users to show is a copy of all users
  const [usersToShow, setShowUsers] = useState(users);
  useEffect(() => {
    const raw = localStorage.getItem("users") || [];
    setUser(JSON.parse(raw as string));
  }, []);
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    setShowUsers(users);
    filterThing(
      (document.getElementById("searchText") as HTMLInputElement).value,
      (document.getElementById("searchPhone") as HTMLInputElement).value
    );
  }, [users]);

  const filterThing = (letter: string, phoneN: string) => {
    let newShowUsers = users;
    if (
      (document.getElementById("selectedClass") as HTMLInputElement).value ===
      "Empty"
    ) {
      newShowUsers = users;
    } else {
      newShowUsers = newShowUsers.filter(function(user) {
        return (
          user.status ===
          (document.getElementById("selectedClass") as HTMLInputElement).value
        );
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

  return (
    <Context.Provider
      value={{ users, setUser, setShowUsers, usersToShow, filterThing }}
    >
      <div className={styles.container}>
        <AddUser></AddUser>

        <UsersList></UsersList>
      </div>
    </Context.Provider>
  );
}
