import { useEffect, useState } from "react";

const useDetailsTagAnimations = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [detailsRef, setDetailsRef] = useState(null);
  const [animation, setAnimation] = useState(null);

  const handleDetailsClick = (event, ref) => {
    event.preventDefault();
    const { id } = event.target;
    setDetailsRef(ref);
    const detailsTag = document.getElementById(`${id}DetailsTag`);
    const summaryTag = document.getElementById(id);
    if (isClosing || !detailsTag.open) {
      open(detailsTag, summaryTag, id);
    } else if (isExpanding || detailsTag.open) {
      shrink(detailsTag, summaryTag, id);
    }
  }
  const open = (detailsTag, summaryTag, id) => {
    detailsTag.open = true;
    window.requestAnimationFrame(() => expand(detailsTag, summaryTag, id));
  }
  const expand = (detailsTag, summaryTag, id) => {
    setIsExpanding(true);
    // const startHeight = `${detailsTag.offsetHeight}px`;
    // const endHeight = `${summaryTag.offsetHeight + content.offsetHeight}px`;
    // console.log(startHeight, endHeight);
    if (animation) {
      animation.cancel();
    }
    let newAnimation;
    if (id === 'userOptions') {
      const content = document.getElementById('user-sidebar');
      newAnimation = content.animate(
        {
          left: ['-300px', '0']
        },
        {
          duration: 200,
          easing: 'ease-out'
        }
      );
    } else if (id === 'optionsOptions') {
      const content = document.getElementById('options-sidebar');
      newAnimation = content.animate(
        {
          right: ['-300px', '0']
        },
        {
          duration: 200,
          easing: 'ease-out'
        }
      );
    } else {
      const content = document.getElementById('filters-bar-container');
      newAnimation = content.animate(
        {
          top: ['-300px', '50px']
        },
        {
          duration: 300,
          easing: 'ease-in'
        }
      );
    }
    setAnimation(newAnimation);
  }
  const shrink = (detailsTag, summaryTag, id) => {
    setIsClosing(true);
    // const startHeight = `${detailsTag.offsetHeight}px`;
    // const endHeight = `${summaryTag.offsetHeight + content.offsetHeight}px`;

    if (animation) {
      animation.cancel();
    }
    let newAnimation;
    if (id === 'userOptions') {
      const content = document.getElementById('user-sidebar');
      newAnimation = content.animate(
        {
          left: ['0', '-300px']
        },
        {
          duration: 200,
          easing: 'ease-out'
        }
      )
    } else if (id === 'optionsOptions') {
      const content = document.getElementById('options-sidebar');
      newAnimation = content.animate(
        {
          right: ['0', '-300px']
        },
        {
          duration: 200,
          easing: 'ease-out'
        }
      );
    } else {
      const content = document.getElementById('filters-bar-container');
      newAnimation = content.animate(
        {
          top: ['50px', '-100px']
        },
        {
          duration: 300,
          easing: 'ease-in'
        }
      );
    }
    setAnimation(newAnimation);
  }
  useEffect(() => {
    if (animation) {
      if (!isClosing) {
        animation.onfinish = () => onAnimationFinish(detailsRef.current, true);
        animation.oncancel = () => setIsExpanding(false);
      } else {
        animation.onfinish = () => onAnimationFinish(detailsRef.current, false);
        animation.oncancel = () => setIsClosing(false);
      }
    }
  }, [animation]);

  const onAnimationFinish = (detailsTag, open) => {
    detailsTag.open = open;
    setAnimation(null);
    setIsClosing(false);
    setIsExpanding(false);
  }
  return handleDetailsClick;
}
export default useDetailsTagAnimations;