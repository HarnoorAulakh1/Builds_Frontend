import styles  from './post.module.css';
function Header({img,name}){
    return (
        <div className={styles.header}>
            <img src={img} alt="" />
            <p>{name}</p>
        </div>
    )
}
export default Header;