import { Header } from "antd/lib/layout/layout";
import React from "react";
import styles from "./Nav.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Menu } from "antd";
const items = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Todo",
    link: "/todo",
  },
  {
    title: "Not yet",
    link: "/notyet",
  },
];
function Nav() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const onClickMenu = (e) => {
    const key = +e.key - 1;
    const link = items[key].link;
    console.log(link);
    router.push(link);
  };
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className={styles.menu}
        items={items.map((item, index) => {
          const key = index + 1;
          return {
            key,
            label: item.title,
          };
        })}
        onClick={onClickMenu}
      />
      <div className={styles.authLayout}>
        {status === "authenticated" && (
          <div style={{ display: "flex" }}>
            <div className={styles.userName}>
              {`${session?.token?.user?.nickName} `}
            </div>
            <div style={{ color: "white", textAlign: "center", width: "20px" }}>
              /
            </div>
          </div>
        )}
        {status === "authenticated" ? (
          <div className={styles.logoutBtn} onClick={() => signOut()}>
            LogOut
          </div>
        ) : (
          <div className={styles.loginBtn} onClick={() => signIn()}>
            LogIn
          </div>
        )}
      </div>
    </Header>
  );
}

export default Nav;
