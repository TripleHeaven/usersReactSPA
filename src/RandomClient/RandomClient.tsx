import React, { useContext } from "react";
import { Context } from "../handlerContext";
// contain main functionality containing storing deleting etc. for clients
export default function RandomClient() {
  const emails = [
    "test@gmail.com",
    "markcucker@yandex.ru",
    "girdl@men.ru",
    "aaa@mail.ru",
    "qqq@gmail.com",
  ];
  const names = [
    "Буров Илья Вячеславович",
    "Mike Puck",
    "Alex Darkstalker",
    "Sofia Mark",
    "Eddy Murk",
    "Lee Scott",
  ];
  const password = ["test"];
  const phones = ["+71234372242"];
  const status = ["Client", "Partner", "Admin"];
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };
  const { setUser, users } = useContext(Context);
  const addRandomUser = () => {
    setUser([
      ...users,
      {
        userID: Date.now().toString(),
        email: emails[getRandomInt(0, emails.length)],
        password: password[0],
        phone: phones[0],
        name: names[getRandomInt(0, names.length)],
        status: status[getRandomInt(0, status.length)],
        dateCreated: new Date(),
        lastChange: new Date(),
      },
    ]);
    console.log(users);
  };
  return <button onClick={() => addRandomUser()}>Add random user</button>;
}
