import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

import TransitionEffet from "../common/TransitionEffet";
import Button from "../common/Button";
import Input from "../form/Input";
import { selectReview } from "../../features/review/reviewSlice";

const PostReviewForm = ({ isOpen, handleModal, title, action, formAction }) => {
  const { message } = useSelector(selectReview);

  const initReview = { rating: 0, comment: "" };

  const [review, setReview] = useState(initReview);

  const [reviewMistake, setReviewMistake] = useState();

  const handleReview = (id, value) => {
    setReview({ ...review, [id]: value });
    setReviewMistake(null);
  };

  const valid = (review) => {
    if (review.rating === 0) {
      setReviewMistake("Plase select rating range");
      return false;
    } else if (review.comment === "") {
      setReviewMistake("Plase enter some comment");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = valid(review);
    if (validate) {
      setReviewMistake();
      setReview(initReview);
      formAction(review);
      handleModal();
    }
  };

  useEffect(() => {
    setReviewMistake();
    setReview(initReview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModal}>
        <TransitionEffet>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionEffet>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="flex justify-center items-center p-4 text-center sm:items-center sm:p-0"
            style={{ height: "100vh" }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-purple-600"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-red-600 text-center my-3 font-bold text-2xl capitalize">
                          {message?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div style={{ maxHeight: "90vh", overflowY: "auto" }}>
                      <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <Input
                            id="rating"
                            title="Rating"
                            type="range"
                            placeHolder="Enter full name..."
                            value={review.rating}
                            errorMessage={reviewMistake}
                            onChange={handleReview}
                            min={1}
                            max={5}
                            step={0.2}
                          />
                          {review.rating !== 0 && (
                            <p className="text-l font-medium text-gray-900">
                              Selected Value {review.rating}
                            </p>
                          )}
                        </div>
                        <div className="col-span-full">
                          <Input
                            id="comment"
                            title="Comment"
                            type="text"
                            placeHolder="Enter comment..."
                            value={review.comment}
                            errorMessage={reviewMistake}
                            onChange={handleReview}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      >
                        {action}
                      </Button>
                      <Button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          setReviewMistake();
                          setReview(initReview);
                          handleModal();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PostReviewForm;
