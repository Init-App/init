import { Spinner } from 'app/components';
import './loading.scss';

export default function Loading() {
  return (
    <div className="loader-container">
      <div className="loading">
        <Spinner />
      </div>
    </div>
  );
}
