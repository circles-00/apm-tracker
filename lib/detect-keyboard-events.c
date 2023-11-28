#include <fcntl.h>
#include <linux/input.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>

char *appendStringToChar(const char *destination, const char *source) {
  // Calculate the total length of the combined string
  size_t dest_len = strlen(destination);
  size_t src_len = strlen(source);

  // Allocate memory for the combined string
  char *combined = (char *)malloc(dest_len + src_len + 1);

  if (combined == NULL) {
    printf("Memory allocation failed!");
    return NULL;
  }

  // Copy the contents of the destination string to the combined string
  strcpy(combined, destination);

  // Copy the contents of the source string to the combined string
  strcpy(combined + dest_len, source);

  return combined;
}

int main(int argc, char **argv) {
  if (argc != 2) {
    printf("Usage: %s <device number>\n", argv[0]);
    return 1;
  }

  char *device_file_path = "/dev/input/event";
  const char *device_file = appendStringToChar(device_file_path, argv[1]);

  struct input_event ev;
  int fd;

  fd = open(device_file, O_RDONLY);
  if (fd == -1) {
    perror("Cannot open keyboard device");
    return 1;
  }

  while (1) {
    read(fd, &ev, sizeof(struct input_event));

    if (ev.type == EV_KEY && ev.value == 1) {
      printf("Key Pressed: %d\n", ev.code); // Print the key code
      fflush(stdout);
    }
  }

  close(fd);
  return 0;
}
