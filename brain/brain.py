import json
import multiprocessing
import subprocess
from colorama import Fore, Style

class Controller:
    def __init__(self, filename):
        self.filename = filename
        self.task_queues = {}
        self.workers = []

    def start(self):
        with open(self.filename, "r") as f:
            for line in f:
                task = json.loads(line.strip())
                task_type = task["taskType"]
                if task_type not in self.task_queues:
                    self.task_queues[task_type] = multiprocessing.Queue()
                    worker = Worker(self.task_queues[task_type])
                    worker.start()
                    self.workers.append(worker)
                self.task_queues[task_type].put(task)

class Worker(multiprocessing.Process):
    def __init__(self, task_queue):
        super().__init__()
        self.task_queue = task_queue

    def run(self):
        while True:
            task = self.task_queue.get()
            if task is None:
                break
            task_name = task["taskType"]
            task_args = task
            print(f"{Fore.YELLOW}Executing task {task_name} with args {task_args}{Style.RESET_ALL}")
            result = subprocess.run(["python3", f"{task_name}.py", json.dumps(task_args)], capture_output=True)
            print(f"{Fore.GREEN}Task {task_name} output:{Style.RESET_ALL} {result.stdout.decode()}")

if __name__ == "__main__":
    controller = Controller("tasks.json")
    controller.start()

    # wait for workers to finish
    for queue in controller.task_queues.values():
        queue.put(None)
    for worker in controller.workers:
        worker.join()