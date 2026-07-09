import { SITE } from '../../../config';
import type { CollectionEntry } from 'astro:content';
import dayjs from 'dayjs';

export const post = (props: CollectionEntry<'blog'>) => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        padding: '6% 8%',
        position: 'relative',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          fontFamily: 'Instrument Sans',
        }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '12px', margin: 0, fontWeight: 400 }}>
            {SITE.website}
          </p>
          <p
            style={{
              fontSize: '72px',
              margin: 0,
              fontFamily: 'Cormorant',
              fontWeight: 600,
            }}>
            {props.data.title}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <p style={{ display: 'flex', gap: 8 }}>
            {(props.data.tags || []).map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
          </p>
          <p>{dayjs(props.data.pubDate).format('YYYY-MM-DD')}</p>
        </div>
      </div>
    </div>
  );
};
