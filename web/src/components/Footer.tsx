import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
    const footerItems = ["Catharsis © 2022", "Contact", "Social"];
    return (
        <div style={{ marginTop: 10, marginBottom: 10, position: "fixed", bottom: 0, width: "100%" }}>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {footerItems.map(item => <span key={item} onClick={() => { }} style={{ marginLeft: 20, cursor: "pointer" }}>{item}</span>)}
                <a href="https://www.facebook.com/profile.php?id=100009870003700"
                    className="facebook social"
                    style={{ color: "blue", marginLeft: 10 }}
                >
                    <FontAwesomeIcon icon={faFacebook} size="1x" />
                </a>
            </div>
        </div>
    );
}
