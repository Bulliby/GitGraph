// ************************************************************************** //
//                                                                            //
//                                                                            //
//   linked-list.js                                                           //
//                                                        ________            //
//   By: waxer <wellsguillaume+at+gmail.com>             /   ____/_  _  __    //
//                                                      /    \  _\ \/ \/ /    //
//   Created: 2022/05/28 19:01:14 by waxer              \     \_\ \     /     //
//   Updated: 2022/05/28 22:37:52 by waxer               \________/\/\_/      //
//                                                                            //
// ************************************************************************** //


/**
 *
 */

export default class LinkedList {
    add(data) {
        let newNode = new Elem(data, null);
        if (this.first) {
            this.current.next = newNode;
        } else {
            this.first = newNode;
        }
        newNode.next = this.first;
        this.current = newNode;
        this.last = newNode;
    }
    
    listSize() {
        let current = this.first;
        let count = 1;
        while (current.next && current !== this.last) {
            count++;
            current = current.next;
        }

        return count;
    }

    listIter(func) {
        if (!this.first)
            return;
        let current = this.first;

        while (current !== this.last) {
            func(current);
            current = current.next;
        }
        func(current);
        current = current.next;
    }

    get() {
        return this.current.data;
    }

    walk() {
        this.current = this.current.next;
    }
}

class Elem {
    constructor (data, next) {
        this.data = data;
        this.next = next;
    }
}
