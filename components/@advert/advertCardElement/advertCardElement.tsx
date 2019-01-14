import { Avatar, Card, CardActionArea, CardContent, Divider } from '@material-ui/core'
import Link from 'next/link'
import styles from './styles.css'
import { IAdvertCardElementProps } from './types'

export const AdvertCardElement = ({ advert, key }: IAdvertCardElementProps): JSX.Element => (
  <Card className={styles.card} key={key}>
    <Link as={`/detail/${advert.id}`} href={`/detail?id=${advert.id}`}>
      <CardActionArea>
        <CardContent className={styles.cardContent}>
          <div className={styles.cardContentTop}>
            {advert.userImageURL && <Avatar className={styles.cardContentAvatar} alt={advert.fullName} src={advert.userImageURL} />}
            <div className={styles.cardContentTeaser}>
              <h2>{advert.title}</h2>
              <div className={styles.categories}>
                {advert.categories.map((categorie: string, index: number) => (
                  <span className={styles.categorie} key={index}>
                    #{categorie}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Divider />
          <div className={styles.cardContentDescription}>
            <p>{advert.description}</p>
          </div>
        </CardContent>
      </CardActionArea>
    </Link>
  </Card>
)
