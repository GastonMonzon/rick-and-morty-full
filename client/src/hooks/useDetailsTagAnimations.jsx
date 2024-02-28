import { useEffect, useState } from "react";

const useDetailsTagAnimations = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [detailsRef, setDetailsRef] = useState(null);
  const [animation, setAnimation] = useState(null);

  const handleDetailsClick = (event, ref, contentId) => {
    event.preventDefault();
    const { id } = event.target;
    setDetailsRef(ref);
    const detailsTag = document.getElementById(`${id}DetailsTag`);
    const summaryTag = document.getElementById(id);
    if (isClosing || !detailsTag.open) {
      open(detailsTag, summaryTag, id, contentId);
    } else if (isExpanding || detailsTag.open) {
      shrink(detailsTag, summaryTag, id, contentId);
    }
  }
  const open = (detailsTag, summaryTag, id, contentId) => {
    detailsTag.open = true;
    window.requestAnimationFrame(() => expand(detailsTag, summaryTag, id, contentId));
  }
  const expand = (detailsTag, summaryTag, id, contentId) => {
    setIsExpanding(true);
    if (animation) {
      animation.cancel();
    }
    let newAnimation;
    const content = document.getElementById(contentId);
    if (id === 'userOptions') {
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
      // const startHeight = `${detailsTag.offsetHeight}px`;
      const endHeight = `${content.offsetHeight}px`;
      const endMargin = `${content.offsetHeight + 20}px`;
      newAnimation = content.animate(
        {
          height: [0, endHeight],
          marginTop: [0, '10px']
        },
        {
          duration: 200,
          easing: 'ease-in-out'
        }
      );
      setAnimation(newAnimation);
      newAnimation = detailsTag.animate(
        {
          marginBottom: [0, endMargin]
        },
        {
          duration: 200,
          easing: 'ease-in-out'
        }
      );
      setTimeout(() => {
        content.style.overflow = 'visible';
        content.style.marginTop = '10px';
        content.style.marginBottom = '10px';
        detailsTag.style.marginBottom = endMargin;
      }, 100);
    }
    setAnimation(newAnimation);
  }
  const shrink = (detailsTag, summaryTag, id, contentId) => {
    setIsClosing(true);

    if (animation) {
      animation.cancel();
    }
    let newAnimation;
    const content = document.getElementById(contentId);
    if (id === 'userOptions') {
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
      const startHeight = `${content.offsetHeight}px`;
      const startMargin = `${content.offsetHeight + 20}px`;
      // const endHeight = `${detailsTag.offsetHeight}px`;
      content.style.overflow = 'hidden';
      newAnimation = content.animate(
        {
          height: [startHeight, 0],
          marginTop: ['10px', 0]
        },
        {
          duration: 200,
          easing: 'ease-in-out'
        }
      );
      setAnimation(newAnimation);
      newAnimation = detailsTag.animate(
        {
          marginBottom: [startMargin, 0]
        },
        {
          duration: 200,
          easing: 'ease-in-out'
        }
      );
      setTimeout(() => {
        content.style.marginTop = 0;
        detailsTag.style.marginBottom = 0;
      }, 100);
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