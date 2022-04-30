import './error-helper.scss';
import baseline_error from '../assets/baseline-error.png';

export function ErrorHelper(p: { helperText: string }) {
    return <span className="helper">
        <img className="error-image" src={baseline_error} />
        <span className="error-text">{p.helperText}</span>
    </span>
}
