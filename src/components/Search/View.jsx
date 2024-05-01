import styles from "./Search.module.css";
function View({data,clicked}){
    return (
        <div className={styles.header} onClick={()=>clicked(data)} >
            <img src={data.photo} alt="" />
            <p>{data.username}</p>
        </div>
    )
}
export default View;