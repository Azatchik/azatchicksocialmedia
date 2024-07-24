import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

// На заметку!
// Почему то колбек который мы прокидывем в обзервер будет выполняться бесконечно
// И бы должны будем сделать условия при которых он перестанет выполняться
// Например в этом приложении мы проверяли в слайсе о количестве возвращаемых статей
// Если там возвращается 0, статей не осталось, то он сохраняет это в hasMore и уже условие не дает делать подгрузки
// И когда загрузка тоже не будет запрос надо сделать условие в использовании уже в компоненте запроса
export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: UseInfiniteOptions) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
