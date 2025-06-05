import ListCreateForm from "../../components/ListCreateForm/ListCreateForm";
import styles from './FavoritesView.module.css'

export default function FavoritesView(){
    return(
        <>
        <div className={styles.form}>
        <ListCreateForm />
        </div>
        </>
    )
}