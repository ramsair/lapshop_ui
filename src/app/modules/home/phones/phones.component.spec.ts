import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesComponent } from './phones.component';

describe('PhonesComponent', () => {
  let component: PhonesComponent;
  let fixture: ComponentFixture<PhonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhonesComponent]
    });
    fixture = TestBed.createComponent(PhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
