import React, { useState, useContext } from "react";
import styles from "./UsersList.scss";
import { UserT } from "../TypesTS/UserT";
import { Context } from "../handlerContext";
import UserCard from "../UserCard/UserCard";
// contain main functionality containing storing deleting etc. for clients
export default function UsersList() {
  const { usersToShow, filterThing } = useContext(Context);

  const [seatchField, setSearch] = useState<string>("");
  const [seatchFieldPhone, setSearchPhone] = useState<string>("");

  return (
    <div className={styles.usersList}>
      <div className={styles.filterContainer}>
        <div className={styles.filterLabel}>Filter by status</div>
        <select
          id="selectedClass"
          onChange={() =>
            filterThing(
              (document.getElementById("searchText") as HTMLInputElement).value,
              (document.getElementById("searchPhone") as HTMLInputElement).value
            )
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
              (document.getElementById("searchText") as HTMLInputElement).value,
              (document.getElementById("searchPhone") as HTMLInputElement).value
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
              (document.getElementById("searchText") as HTMLInputElement).value,
              (document.getElementById("searchPhone") as HTMLInputElement).value
            );
          }}
          value={seatchFieldPhone}
        ></input>
      </div>
      <div className={styles.usersTable}>
        {usersToShow.map((item: UserT) => (
          <UserCard key={item.userID} user={item}></UserCard>
        ))}
      </div>
    </div>
  );
}
