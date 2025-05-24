import Typewriter from 'typewriter-effect';

const HeroTitle = () => {
    return (
        <div>
            <Typewriter component="div"
                options={{
                delay: 50,
                deleteSpeed: 30,
                cursor: '',
                }}
                onInit={
                (typewriter) => {
                    typewriter
                    .pauseFor(500)
                    .typeString('Hello, ').pauseFor(1500)
                    .typeString("I'm Kayra")
                    .start();
                }
                }
            />
        </div>
    );
}

export default HeroTitle;