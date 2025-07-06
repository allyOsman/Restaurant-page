import classes from './AsideBar.module.css';

function AsideBar() {
  return (
    <aside className={classes.aside}>
      <h2 className={classes.title}>Your Cart (Total cart)</h2>
      <p className={classes.text}>selected cart</p>
      <button className={classes.btn}>
        Confirm Order
      </button>
    </aside>
  );
}

export default AsideBar;
